/**
 * Reserve Coatings — Google Sheets appointment hub
 *
 * Setup (standalone with SHEET_ID, or bound — leave SHEET_ID empty if bound):
 * 1. Paste this script into Extensions → Apps Script
 * 2. Run setupSheet() once
 * 3. Run installOnEditTrigger() once
 * 4. Deploy → Web app → Execute as: Me → Who has access: Anyone
 * 5. Copy the /exec URL → GOOGLE_SHEETS_WEBHOOK_URL in Vercel
 */

var SHEET_ID = "1hZetE0vkl7R6wgJJCn_BL6pZ0eQ4Tl7DB3PJfgx2Eos";
var SHEET_NAME = "Appointments";

var COLUMNS = [
  "submissionId", "submittedAt", "submissionType", "formType", "status", "appointmentType",
  "preferredDate", "preferredTime", "scheduledStart", "scheduledEnd",
  "firstName", "lastName", "email", "phone", "city", "zip", "service",
  "timeline", "budget", "source", "message", "bookingType", "estimateRange",
  "spaceType", "sqft", "tier", "photoUrls", "approvedAt", "calendarEventId",
  "calendarEventLink", "syncError"
];

var APPOINTMENT_LABELS = {
  "virtual": "Virtual Walk-through",
  "in-person": "In-Person Measure",
  "phone-callback": "Phone Callback",
  "info-only": "Consultation"
};

function getSpreadsheet_() {
  if (SHEET_ID) return SpreadsheetApp.openById(SHEET_ID);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("No active spreadsheet. Set SHEET_ID at the top of the script.");
  return ss;
}

function getSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab "' + SHEET_NAME + '" not found. Run setupSheet() first.');
  return sheet;
}

function colIndex_(name) {
  return COLUMNS.indexOf(name) + 1;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getHeaderMap_(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), COLUMNS.length);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var map = {};
  for (var i = 0; i < headers.length; i++) {
    var name = String(headers[i] || "").trim();
    if (name) map[name] = i + 1;
  }
  return map;
}

function headerCol_(headerMap, name) {
  if (headerMap[name]) return headerMap[name];
  var idx = COLUMNS.indexOf(name);
  return idx >= 0 ? idx + 1 : 0;
}

function findRowBySubmissionId_(sheet, submissionId) {
  var id = String(submissionId || "").trim();
  if (!id) return 0;
  var headerMap = getHeaderMap_(sheet);
  var col = headerCol_(headerMap, "submissionId");
  if (!col) return 0;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  var values = sheet.getRange(2, col, lastRow, col).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0] || "").trim() === id) return i + 2;
  }
  return 0;
}

function writeDataToRow_(sheet, rowNum, data) {
  var headerMap = getHeaderMap_(sheet);
  for (var i = 0; i < COLUMNS.length; i++) {
    var key = COLUMNS[i];
    var incoming = data[key];
    if (incoming === undefined || incoming === null) continue;
    var next = String(incoming);
    if (next === "") continue;
    var col = headerCol_(headerMap, key);
    if (!col) continue;
    sheet.getRange(rowNum, col).setValue(next);
  }
}

function mergeRow_(sheet, rowNum, data) {
  writeDataToRow_(sheet, rowNum, data);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut_({ ok: false, error: "No POST body received." });
    }
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonOut_({ ok: false, error: "Invalid JSON: " + parseErr.message });
    }

    var sheet = getSheet_();
    if (!data.status) data.status = "Pending";

    var submissionId = String(data.submissionId || "").trim();
    if (submissionId) {
      var existingRow = findRowBySubmissionId_(sheet, submissionId);
      if (existingRow > 0) {
        mergeRow_(sheet, existingRow, data);
        return jsonOut_({ ok: true, updated: true });
      }
    }

    var newRowNum = sheet.getLastRow() + 1;
    writeDataToRow_(sheet, newRowNum, data);
    return jsonOut_({ ok: true, created: true, row: newRowNum });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

function doGet() {
  return jsonOut_({ ok: true, service: "Reserve Coatings intake" });
}

function onEditInstallable(e) {
  try {
    if (!e || !e.range) return;
    var sheet = e.range.getSheet();
    if (sheet.getName() !== SHEET_NAME) return;
    var headerMap = getHeaderMap_(sheet);
    var statusCol = headerCol_(headerMap, "status");
    if (!statusCol || e.range.getColumn() !== statusCol) return;
    var rowNum = e.range.getRow();
    if (rowNum === 1) return;
    var status = String(e.range.getValue()).trim();
    if (status === "Approved") processApproval_(sheet, rowNum);
  } catch (err) {
    try {
      var s = e.range.getSheet();
      var headerMap = getHeaderMap_(s);
      var syncCol = headerCol_(headerMap, "syncError");
      if (syncCol) {
        s.getRange(e.range.getRow(), syncCol).setValue("onEdit error: " + err.message);
      }
    } catch (ignore) {}
  }
}

function processApproval_(sheet, rowNum) {
  var headerMap = getHeaderMap_(sheet);

  function get(name) {
    var col = headerCol_(headerMap, name);
    if (!col) return "";
    return sheet.getRange(rowNum, col).getValue();
  }
  function setCell(name, val) {
    var col = headerCol_(headerMap, name);
    if (!col) return;
    sheet.getRange(rowNum, col).setValue(val);
  }

  var existingEventId = get("calendarEventId");
  if (existingEventId && String(existingEventId).trim() !== "") return;

  var startRaw = get("scheduledStart");
  var endRaw = get("scheduledEnd");
  if (!startRaw || !endRaw || String(startRaw).trim() === "" || String(endRaw).trim() === "") {
    setCell("syncError", "Missing scheduledStart or scheduledEnd — cannot create calendar event.");
    return;
  }
  var start = new Date(startRaw);
  var end = new Date(endRaw);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    setCell("syncError", "Invalid scheduledStart or scheduledEnd date format.");
    return;
  }

  var apptType = String(get("appointmentType") || "").trim();
  var apptLabel = APPOINTMENT_LABELS[apptType] || apptType || "Appointment";
  var firstName = String(get("firstName") || "").trim();
  var lastName = String(get("lastName") || "").trim();
  var fullName = (firstName + " " + lastName).trim();
  var title = "Reserve Coatings — " + apptLabel + " — " + fullName;

  var description = [
    "Appointment type: " + apptLabel,
    "Email: " + (get("email") || ""),
    "Phone: " + (get("phone") || ""),
    "Service: " + (get("service") || ""),
    "Estimate: " + (get("estimateRange") || ""),
    "Photos: " + (get("photoUrls") || "None"),
    "Form type: " + (get("formType") || ""),
    "Message: " + (get("message") || "")
  ].join("\n");

  var options = { description: description };
  var email = String(get("email") || "").trim();
  if (email) {
    options.guests = email;
    options.sendInvites = true;
  }

  var calendar = CalendarApp.getDefaultCalendar();
  var event = calendar.createEvent(title, start, end, options);
  var eventId = event.getId();

  setCell("approvedAt", new Date().toISOString());
  setCell("calendarEventId", eventId);
  setCell("calendarEventLink", event.getHtmlLink());
  setCell("syncError", "");
}

function setupSheet() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
  sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  var statusCol = colIndex_("status");
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Approved", "Declined"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, statusCol, Math.max(sheet.getMaxRows(), 500), 1).setDataValidation(rule);
  ss.toast("Appointments sheet is ready.", "Reserve Coatings", 5);
}

/**
 * Run once before setupSheet when upgrading from the old schema (no submissionId column).
 * Inserts a blank column A so existing rows stay aligned, then rewrites headers.
 */
function migrateAddSubmissionIdColumn() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupSheet();
    return;
  }
  var firstHeader = String(sheet.getRange(1, 1).getValue() || "").trim();
  if (firstHeader !== "submissionId") {
    sheet.insertColumnBefore(1);
  }
  setupSheet();
  ss.toast("Migration complete: submissionId column added and headers refreshed.", "Reserve Coatings", 8);
}

function installOnEditTrigger() {
  var ss = getSpreadsheet_();
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onEditInstallable") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("onEditInstallable").forSpreadsheet(ss).onEdit().create();
  ss.toast("Approval trigger installed.", "Reserve Coatings", 5);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Reserve Coatings")
    .addItem("Migrate: add submissionId column", "migrateAddSubmissionIdColumn")
    .addItem("Setup sheet", "setupSheet")
    .addItem("Install approval trigger", "installOnEditTrigger")
    .addItem("Retry calendar sync (selected row)", "retrySelectedRow")
    .addToUi();
}

function retrySelectedRow() {
  var sheet = getSheet_();
  var rowNum = sheet.getActiveCell().getRow();
  if (rowNum === 1) {
    getSpreadsheet_().toast("Select a data row first.", "Reserve Coatings", 5);
    return;
  }
  var headerMap = getHeaderMap_(sheet);
  var syncCol = headerCol_(headerMap, "syncError");
  if (syncCol) {
    sheet.getRange(rowNum, syncCol).setValue("");
  }
  processApproval_(sheet, rowNum);
  getSpreadsheet_().toast("Retry complete for row " + rowNum + ".", "Reserve Coatings", 5);
}
