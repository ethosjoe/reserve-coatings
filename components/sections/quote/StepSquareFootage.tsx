import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function StepSquareFootage({
  sqft,
  onChange,
  onNext,
  onBack,
}: {
  sqft: number;
  onChange: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">How much square footage?</h1>
      <div className="mt-10">
        <Input
          type="number"
          min={100}
          max={5000}
          value={sqft}
          onChange={(e) => onChange(Number(e.target.value) || 100)}
          className="form-input max-w-xs text-2xl tabular-nums"
        />
        <span className="ml-2 text-smoke">sq ft</span>
        <Slider
          className="mt-8 py-3"
          min={100}
          max={5000}
          step={50}
          value={[sqft]}
          onValueChange={([v]) => onChange(v ?? 100)}
        />
        <p className="mt-4 text-sm text-smoke">
          Not sure? Most 2-car garages are 400–600 sq ft. Most basements are 800–1,500.
        </p>
      </div>
      <div className="mt-10 flex gap-4">
        <Button onClick={onBack} className="btn-secondary">
          Back
        </Button>
        <Button onClick={onNext} className="btn-primary">
          Continue
        </Button>
      </div>
    </div>
  );
}
