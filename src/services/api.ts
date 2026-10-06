import { enhanceImage, loadImage } from "../lib/imageProcessing";
import type {
  Application,
  ApplicationExample,
  DatasetSample,
  ProcessingJob,
  ProcessingResult,
} from "../types";

// ---------------------------------------------------------------------------
// This file is the single boundary between UI components and "where the data
// actually comes from." Right now every method runs entirely in the browser
// using the canvas-based prototype pipeline. When the FastAPI backend is
// ready, only the internals of these functions need to change — components
// that call getDatasetSamples(), createProcessingJob(), etc. will not need
// to be rewritten.
// ---------------------------------------------------------------------------

function generateId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const jobStore = new Map<string, ProcessingJob>();

/**
 * Reads a File into a data URL and reports its natural pixel dimensions.
 * Mirrors what a future POST /upload endpoint would return.
 */
export function uploadImage(
  file: File,
): Promise<{ dataUrl: string; fileName: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = String(reader.result);
        const image = await loadImage(dataUrl);
        resolve({ dataUrl, fileName: file.name, width: image.width, height: image.height });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.readAsDataURL(file);
  });
}

/**
 * Runs the SRM enhancement and records it as a "job," the same shape a real
 * backend job queue would use. Today this resolves immediately because
 * processing happens synchronously in the browser; a real backend version
 * would return a pending job that the UI polls via getProcessingJob().
 */
export async function createProcessingJob(input: {
  dataUrl: string;
  fileName: string;
}): Promise<ProcessingJob> {
  const id = generateId();
  const createdAt = new Date().toISOString();

  const job: ProcessingJob = {
    id,
    fileName: input.fileName,
    status: "processing",
    createdAt,
  };
  jobStore.set(id, job);

  try {
    const enhanced = await enhanceImage(input.dataUrl, input.fileName);
    const result: ProcessingResult = {
      id,
      fileName: enhanced.fileName,
      inputUrl: enhanced.inputUrl,
      outputUrl: enhanced.outputUrl,
      uncertaintyUrl: enhanced.uncertaintyUrl,
      inputSize: enhanced.inputSize,
      outputSize: enhanced.outputSize,
      status: "complete",
    };
    const completedJob: ProcessingJob = { ...job, status: "complete", result };
    jobStore.set(id, completedJob);
    return completedJob;
  } catch (error) {
    const failedJob: ProcessingJob = { ...job, status: "error" };
    jobStore.set(id, failedJob);
    throw error;
  }
}

export async function getProcessingJob(id: string): Promise<ProcessingJob | undefined> {
  return jobStore.get(id);
}

export async function getProcessingResult(id: string): Promise<ProcessingResult | undefined> {
  return jobStore.get(id)?.result;
}

/**
 * Dataset sample listing. Returns an empty list until real EuroSAT thumbnails
 * and metadata are available — intentionally not populated with placeholder
 * or invented data. Once a backend exists, this becomes:
 *   GET /dataset/samples
 */
export async function getDatasetSamples(): Promise<DatasetSample[]> {
  return [];
}

/**
 * Single dataset sample lookup. Backend equivalent:
 *   GET /dataset/samples/:id
 */
export async function getDatasetSample(id: string): Promise<DatasetSample | undefined> {
  const samples = await getDatasetSamples();
  return samples.find((sample) => sample.id === id);
}

/**
 * Static, factual descriptions of the five application areas this project
 * targets. No performance claims or fabricated analysis — just what the
 * application area is and why enhanced imagery is potentially useful there.
 */
const applications: Application[] = [
  {
    slug: "agriculture",
    name: "Agriculture / Precision Agriculture",
    summary:
      "Finer field boundaries and crop-level detail can support precision agriculture workflows once validated.",
  },
  {
    slug: "urban",
    name: "Urban Development / Smart Cities",
    summary:
      "Sharper urban structure can help planners interpret building footprints and infrastructure growth.",
  },
  {
    slug: "disaster",
    name: "Disaster Management",
    summary:
      "Enhanced imagery could support faster interpretation of affected areas during disaster response.",
  },
  {
    slug: "forestry",
    name: "Forestry / Environmental Monitoring",
    summary:
      "Improved detail may help distinguish vegetation cover and monitor environmental change over time.",
  },
  {
    slug: "infrastructure",
    name: "Infrastructure / Roads / Critical Assets",
    summary:
      "Clearer road networks and structures can support infrastructure mapping and monitoring use cases.",
  },
];

export async function getApplicationData(
  slug: Application["slug"],
): Promise<Application | undefined> {
  return applications.find((app) => app.slug === slug);
}

export async function getAllApplications(): Promise<Application[]> {
  return applications;
}

/**
 * Application-specific example outputs. Returns an empty list — this project
 * does not yet perform application-specific analysis, so nothing is faked
 * here. Backend equivalent: GET /applications/:slug/examples
 */
export async function getApplicationExamples(
  _slug: Application["slug"],
): Promise<ApplicationExample[]> {
  return [];
}