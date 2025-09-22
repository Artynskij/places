import { JSONContent } from "@tiptap/react";

export function hasFormatting(doc: JSONContent): boolean {
    if (!doc) return false;

    if (doc.marks?.length) return true;
    if (doc.type !== "doc" && doc.type !== "paragraph" && doc.type !== "text") {
        return true; // например, heading, list, blockquote
    }

    if (doc.content) {
        return doc.content.some((child) => hasFormatting(child));
    }

    return false;
}
