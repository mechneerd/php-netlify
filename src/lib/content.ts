export interface BlockPayload {
    text?: string;
    markdown?: string;
    items?: string[];
    variant?: string;
    lang?: string;
    code?: string;
    headers?: string[];
    rows?: string[][];
    diagram_id?: number;
    attribution?: string;
    book?: string;
    modern?: string;
    why?: string;
    labels?: string[];
    ids?: number[];
    tabs?: { label: string; body: string }[];
    figure_ref?: string;
    caption?: string;
    page_pdf?: number;
    src?: string;
    alt?: string;
    media_id?: number;
    width?: number;
    height?: number;
    code_example_id?: number;
    level?: number;
}

export interface Block {
    id: number;
    ord: number;
    type: string;
    type_label: string;
    source: string;
    collapsed: boolean;
    citation: string | null;
    payload: BlockPayload;
    text: string;
}

export interface CodeExample {
    id: number;
    listing_ref: string | null;
    tier: number;
    title: string;
    code: string;
    expected_output: string | null;
    explanation: string | null;
    syntax_notes: string | null;
    common_mistake: string | null;
    external_ref: string | null;
}

export interface Diagram {
    id: number;
    lesson_id: number;
    title: string;
    kind: string;
    mermaid_source: string;
    caption: string | null;
}

export interface LessonPayload {
    lesson: {
        id: number;
        title: string;
        slug: string;
        summary: string;
        est_minutes: number;
        source: string;
        source_label: string;
        citation: string;
        is_outdated: boolean;
        chapter?: { number: number; title: string } | null;
        stage?: { number: number; name: string } | null;
    };
    blocks: Block[];
    code_examples: Record<string, CodeExample>;
    diagrams: Record<string, Diagram>;
    diagram_ids: number[];
    section_title: string | null;
}

export interface ManifestEntry {
    slug: string;
    title: string;
    summary: string;
    est_minutes: number;
    source: string;
    source_label: string;
    citation: string;
    is_outdated: boolean;
    section_title: string | null;
    chapter: { number: number | null; title: string | null };
    stage: { number: number | null; name: string | null };
}

export interface StructureLesson {
    id: number;
    title: string;
    slug: string;
}

export interface StructureSection {
    id: number;
    title: string;
    level: number;
    ord: number;
    lessons: StructureLesson[];
}

export interface StructureChapter {
    id: number;
    number: number;
    title: string;
    slug: string;
    sections: StructureSection[];
    lessons: StructureLesson[];
}

export interface Structure {
    generated_at: string;
    chapters: StructureChapter[];
}

import manifestJson from '../data/manifest.json';
import structureJson from '../data/structure.json';

export const manifest = (manifestJson as { lessons: ManifestEntry[] }).lessons;
export const structure = structureJson as unknown as Structure;

export const lessonLoaders = import.meta.glob<LessonPayload>('../data/lessons/*.json');

export async function loadLesson(slug: string): Promise<LessonPayload | undefined> {
    const loader = lessonLoaders[`../data/lessons/${slug}.json`];
    return loader ? loader() : undefined;
}

export function lessonNeighbours(slug: string): { prev: ManifestEntry | null; next: ManifestEntry | null } {
    const index = manifest.findIndex((entry) => entry.slug === slug);
    return {
        prev: index > 0 ? manifest[index - 1] : null,
        next: index >= 0 && index < manifest.length - 1 ? manifest[index + 1] : null,
    };
}

export const tierStyles: Record<number, string> = {
    1: 'bg-emerald-900/40 text-emerald-200',
    2: 'bg-sky-900/40 text-sky-200',
    3: 'bg-violet-900/40 text-violet-200',
    4: 'bg-amber-900/40 text-amber-200',
};

export const tierLabels: Record<number, string> = {
    1: 'Starter',
    2: 'Core',
    3: 'Real-world',
    4: 'Advanced',
};

export const calloutStyles: Record<string, string> = {
    tip: 'border-emerald-800 bg-emerald-950/50 text-emerald-100',
    warn: 'border-amber-800 bg-amber-950/50 text-amber-100',
    danger: 'border-red-800 bg-red-950/50 text-red-100',
    info: 'border-sky-800 bg-sky-950/50 text-sky-100',
};
