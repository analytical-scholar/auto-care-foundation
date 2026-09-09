import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, FileUp, Loader2, Paperclip } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_UPLOAD_BYTES,
  REFERRAL_SOURCES,
  TRAINING_TYPES,
  TRAINING_TYPE_LABELS,
  placementApplicationSchema,
  type PlacementFormValues,
} from "@/lib/placement-schema";
import { cn } from "@/lib/utils";
import { placementApi, toDocumentMeta } from "@/services/placement";
import type { PlacementSubmissionResult } from "@/types/placement";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function Required() {
  return (
    <span className="text-primary" aria-hidden>
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-primary">
      {message}
    </p>
  );
}

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function PlacementForm() {
  const [result, setResult] = React.useState<PlacementSubmissionResult | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PlacementFormValues>({
    resolver: zodResolver(placementApplicationSchema),
    mode: "onBlur",
  });

  const cv = watch("cv") as File | undefined;
  const extraDoc = watch("additionalDocument") as File | undefined;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const submission = await placementApi.submit({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        institution: values.institution,
        courseOrDepartment: values.courseOrDepartment,
        currentLevel: values.currentLevel,
        studentIdNumber: values.studentIdNumber,
        trainingType: values.trainingType,
        preferredStartDate: values.preferredStartDate,
        expectedDuration: values.expectedDuration,
        areaOfInterest: values.areaOfInterest,
        relevantSkills: values.relevantSkills || undefined,
        motivation: values.motivation,
        referralSource: values.referralSource || undefined,
        cv: toDocumentMeta(values.cv as File | undefined),
        additionalDocument: toDocumentMeta(values.additionalDocument as File | undefined),
      });
      setResult(submission);
    } catch {
      setSubmitError(
        "We could not complete your submission just now. Please check your details and try again.",
      );
    }
  });

  if (result) {
    return (
      <div
        className="animate-fade-up rounded-lg border border-border bg-card p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 aria-hidden className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl uppercase">Application Submitted</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Your application has been submitted and will be reviewed. Submitting an
          application does not confirm a placement.
        </p>
        <dl className="mx-auto mt-6 grid max-w-sm gap-3 text-left text-sm">
          <div className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-3">
            <dt className="text-muted-foreground">Reference (preview)</dt>
            <dd className="font-display font-semibold uppercase tracking-wider">
              {result.reference}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-3">
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-display font-semibold uppercase tracking-wider">
              Submitted — under review
            </dd>
          </div>
        </dl>
        <p className="mx-auto mt-4 max-w-md text-xs text-muted-foreground">
          Reference numbers and status tracking are not saved yet, so please keep your own
          copy of the details you entered.
        </p>
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setSubmitError(null);
            }}
          >
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="animate-fade-up space-y-10">
      <fieldset disabled={isSubmitting} className="space-y-6">
        <legend className="text-eyebrow text-primary">Your details</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full name <Required />
            </Label>
            <Input
              id="fullName"
              autoComplete="name"
              aria-required
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
            <FieldError id="fullName-error" message={errors.fullName?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email address <Required />
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone number <Required />
            </Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-required
              aria-invalid={!!errors.phone}
              aria-describedby={cn("phone-help", errors.phone && "phone-error")}
              {...register("phone")}
            />
            <p id="phone-help" className="text-xs text-muted-foreground">
              A number that can receive calls during workshop hours.
            </p>
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentIdNumber">
              Student ID / matric number <Required />
            </Label>
            <Input
              id="studentIdNumber"
              aria-required
              aria-invalid={!!errors.studentIdNumber}
              aria-describedby={
                errors.studentIdNumber ? "studentIdNumber-error" : undefined
              }
              {...register("studentIdNumber")}
            />
            <FieldError
              id="studentIdNumber-error"
              message={errors.studentIdNumber?.message}
            />
          </div>
        </div>
      </fieldset>

      <fieldset disabled={isSubmitting} className="space-y-6">
        <legend className="text-eyebrow text-primary">School & training</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="institution">
              Institution <Required />
            </Label>
            <Input
              id="institution"
              aria-required
              aria-invalid={!!errors.institution}
              aria-describedby={errors.institution ? "institution-error" : undefined}
              {...register("institution")}
            />
            <FieldError id="institution-error" message={errors.institution?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseOrDepartment">
              Course / department <Required />
            </Label>
            <Input
              id="courseOrDepartment"
              aria-required
              aria-invalid={!!errors.courseOrDepartment}
              aria-describedby={
                errors.courseOrDepartment ? "courseOrDepartment-error" : undefined
              }
              {...register("courseOrDepartment")}
            />
            <FieldError
              id="courseOrDepartment-error"
              message={errors.courseOrDepartment?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentLevel">
              Current level / year <Required />
            </Label>
            <Input
              id="currentLevel"
              placeholder="e.g. ND2, 300 level"
              aria-required
              aria-invalid={!!errors.currentLevel}
              aria-describedby={errors.currentLevel ? "currentLevel-error" : undefined}
              {...register("currentLevel")}
            />
            <FieldError id="currentLevel-error" message={errors.currentLevel?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingType">
              Training type <Required />
            </Label>
            <select
              id="trainingType"
              defaultValue=""
              className={selectClasses}
              aria-required
              aria-invalid={!!errors.trainingType}
              aria-describedby={errors.trainingType ? "trainingType-error" : undefined}
              {...register("trainingType")}
            >
              <option value="" disabled>
                Select training type
              </option>
              {TRAINING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TRAINING_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            <FieldError id="trainingType-error" message={errors.trainingType?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredStartDate">
              Preferred start date <Required />
            </Label>
            <Input
              id="preferredStartDate"
              type="date"
              aria-required
              aria-invalid={!!errors.preferredStartDate}
              aria-describedby={
                errors.preferredStartDate ? "preferredStartDate-error" : undefined
              }
              {...register("preferredStartDate")}
            />
            <FieldError
              id="preferredStartDate-error"
              message={errors.preferredStartDate?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedDuration">
              Expected duration <Required />
            </Label>
            <Input
              id="expectedDuration"
              placeholder="e.g. 3 months, 6 months"
              aria-required
              aria-invalid={!!errors.expectedDuration}
              aria-describedby={
                errors.expectedDuration ? "expectedDuration-error" : undefined
              }
              {...register("expectedDuration")}
            />
            <FieldError
              id="expectedDuration-error"
              message={errors.expectedDuration?.message}
            />
          </div>
        </div>
      </fieldset>

      <fieldset disabled={isSubmitting} className="space-y-6">
        <legend className="text-eyebrow text-primary">Interests & documents</legend>

        <div className="space-y-2">
          <Label htmlFor="areaOfInterest">
            Area of interest <Required />
          </Label>
          <Input
            id="areaOfInterest"
            placeholder="e.g. diagnostics, electrical, servicing"
            aria-required
            aria-invalid={!!errors.areaOfInterest}
            aria-describedby={errors.areaOfInterest ? "areaOfInterest-error" : undefined}
            {...register("areaOfInterest")}
          />
          <FieldError id="areaOfInterest-error" message={errors.areaOfInterest?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relevantSkills">Relevant skills (optional)</Label>
          <Textarea
            id="relevantSkills"
            rows={3}
            aria-invalid={!!errors.relevantSkills}
            aria-describedby={cn(
              "relevantSkills-help",
              errors.relevantSkills && "relevantSkills-error",
            )}
            {...register("relevantSkills")}
          />
          <p id="relevantSkills-help" className="text-xs text-muted-foreground">
            Anything you have already practised — tools, software, workshop experience.
          </p>
          <FieldError
            id="relevantSkills-error"
            message={errors.relevantSkills?.message as string | undefined}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FileField
            id="cv"
            label="CV"
            required
            file={cv}
            error={errors.cv?.message as string | undefined}
            onChange={(file) =>
              setValue("cv", file as never, { shouldValidate: true })
            }
          />
          <FileField
            id="additionalDocument"
            label="Additional document (optional)"
            file={extraDoc}
            error={errors.additionalDocument?.message as string | undefined}
            onChange={(file) =>
              setValue("additionalDocument", file as never, { shouldValidate: true })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">
            Why would you like to train with us? <Required />
          </Label>
          <Textarea
            id="motivation"
            rows={5}
            aria-required
            aria-invalid={!!errors.motivation}
            aria-describedby={cn("motivation-help", errors.motivation && "motivation-error")}
            {...register("motivation")}
          />
          <p id="motivation-help" className="text-xs text-muted-foreground">
            A short message in your own words, at least 20 characters.
          </p>
          <FieldError id="motivation-error" message={errors.motivation?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralSource">How did you hear about us? (optional)</Label>
          <select
            id="referralSource"
            defaultValue=""
            className={selectClasses}
            {...register("referralSource")}
          >
            <option value="">Prefer not to say</option>
            {REFERRAL_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {submitError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-primary/50 bg-primary/10 px-4 py-3 text-sm"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{submitError}</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit application"
          )}
        </Button>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Submitting sends your application for consideration. Files are only checked in
          your browser and are not uploaded or stored yet.
        </p>
      </div>
    </form>
  );
}

interface FileFieldProps {
  id: string;
  label: string;
  required?: boolean | undefined;
  file?: File | undefined;
  error?: string | undefined;
  onChange: (file: File | undefined) => void;
}

function FileField({ id, label, required, file, error, onChange }: FileFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required ? <Required /> : null}
      </Label>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-border bg-card/60 px-4 py-4 text-sm transition-colors hover:border-primary/60",
          error && "border-primary/60",
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
          {file ? (
            <Paperclip aria-hidden className="size-4" />
          ) : (
            <FileUp aria-hidden className="size-4" />
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display font-semibold uppercase tracking-wider">
            {file ? file.name : "Choose a file"}
          </span>
          <span className="block text-xs text-muted-foreground">
            {file
              ? `${formatBytes(file.size)} — click to replace`
              : `PDF, Word or image, up to ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB`}
          </span>
        </span>
      </label>
      <input
        id={id}
        type="file"
        className="sr-only"
        accept=".pdf,.doc,.docx,image/jpeg,image/png"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.files?.[0])}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
