const submissionForm = document.querySelector("[data-microscopy-form]");
const imageInput = document.querySelector("[data-image-input]");
const previewStage = document.querySelector("[data-preview-stage]");
const imagePreview = document.querySelector("[data-image-preview]");
const fileName = document.querySelector("[data-file-name]");
const uploadError = document.querySelector("[data-upload-error]");
const story = submissionForm.querySelector("[name='story']");
const storyCount = document.querySelector("[data-story-count]");
const submissionStatus = document.querySelector("[data-submission-status]");
const draftLink = document.querySelector("[data-draft-link]");
let previewUrl = "";

story.addEventListener("input", () => { storyCount.textContent = story.value.length; });

imageInput.addEventListener("change", () => {
  const file = imageInput.files?.[0];
  uploadError.textContent = "";
  imageInput.setCustomValidity("");
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewStage.hidden = true;
  if (!file) return;
  if (file.size > 20 * 1024 * 1024) {
    imageInput.setCustomValidity("Choose an image smaller than 20 MB for the local preview.");
    uploadError.textContent = "Choose an image smaller than 20 MB for the local preview.";
    return;
  }
  fileName.textContent = file.name;
  if (file.type.startsWith("image/") && !/tiff?/i.test(file.type)) {
    previewUrl = URL.createObjectURL(file);
    imagePreview.src = previewUrl;
    imagePreview.hidden = false;
  } else {
    imagePreview.removeAttribute("src");
    imagePreview.hidden = true;
  }
  previewStage.hidden = false;
});

submissionForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!submissionForm.reportValidity()) return;
  const data = new FormData(submissionForm);
  const clean = value => String(value || "").trim();
  const title = `Microscopy submission: ${clean(data.get("title"))}`;
  const body = [
    "## Cellwear microscopy open call",
    "",
    `**Creator credit:** ${clean(data.get("creator"))}`,
    `**Institution or laboratory:** ${clean(data.get("institution")) || "Not provided"}`,
    `**Public portfolio / ORCID / contact link:** ${clean(data.get("portfolio")) || "Not provided"}`,
    "",
    "## Scientific record",
    "",
    `**Work title:** ${clean(data.get("title"))}`,
    `**Connection:** ${clean(data.get("connection"))}`,
    `**Imaging method:** ${clean(data.get("method"))}`,
    `**Sample or subject:** ${clean(data.get("subject"))}`,
    `**Magnification or scale:** ${clean(data.get("scale")) || "Not provided"}`,
    "",
    "**Scientific and visual story:**",
    clean(data.get("story")),
    "",
    "## Image",
    "",
    `**Selected local file:** ${imageInput.files[0].name}`,
    "",
    "> Drag and drop or paste the original microscopy image below before submitting this issue.",
    "",
    "[ATTACH IMAGE HERE]",
    "",
    "## Rights and credit",
    "",
    `**Rights status:** ${clean(data.get("rights"))}`,
    `**Requested credit line:** ${clean(data.get("credit"))}`,
    "",
    "- [x] I confirm that the rights information is accurate and can be documented if requested.",
    "- [x] I confirm that this submission contains no patient-identifying information.",
    "- [x] I understand that submission does not guarantee selection, payment, publication, or merchandise use.",
    "",
    "Any commercial use requires a separate written agreement."
  ].join("\n");
  const url = `https://github.com/Yangzhou-GSI/cellwear/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  draftLink.href = url;
  submissionStatus.hidden = false;
  submissionStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) draftLink.focus();
});

window.addEventListener("pagehide", () => { if (previewUrl) URL.revokeObjectURL(previewUrl); });
