// PDF recipe card export via jsPDF (loaded via CDN as window.jspdf)

export function exportPDF(dish, config) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });

  const margin = 20;
  const pageW = doc.internal.pageSize.getWidth();
  let y = margin;

  const line = (text, size = 11, style = "normal", color = [40, 40, 40]) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, pageW - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.4) + 2;
  };

  const divider = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  const spacer = (h = 4) => { y += h; };

  // ─── Header ───────────────────────────────────────────────────────────────
  line(`${config.emoji}  ${dish.name}`, 20, "bold");
  spacer(2);
  line(`${config.label} · freecoffee.de`, 9, "normal", [130, 130, 130]);
  spacer(4);
  divider();

  if (dish.type === "coffee") {
    // ─── Coffee card ────────────────────────────────────────────────────────
    line(dish.origin, 9, "normal", [110, 80, 50]);
    spacer(1);
    line(dish.meaning, 10, "italic", [80, 60, 40]);
    spacer(5);

    line("Zutaten:", 13, "bold");
    spacer(2);
    for (const ing of dish.ingredients) {
      line(`· ${ing}`, 10);
      spacer(1);
    }
    spacer(4);
    divider();

    line("Zubereitung:", 13, "bold");
    spacer(2);
    line(dish.progress, 10);

  } else {
    // ─── Food card ──────────────────────────────────────────────────────────
    line("Zutaten:", 13, "bold");
    spacer(2);
    for (const slot of dish.slots) {
      if (!slot.ingredients.length) continue;
      const ingList = slot.ingredients.map(i => `${i.emoji} ${i.name}`).join(", ");
      line(`${slot.label}:  ${ingList}`, 10);
      spacer(1);
    }
    spacer(4);
    divider();

    line("Zubereitung:", 13, "bold");
    spacer(2);
    line(config.prepText, 10);
  }

  spacer(8);

  // ─── Footer ───────────────────────────────────────────────────────────────
  divider();
  line("Generiert von freecoffee.de  🎲", 8, "normal", [160, 160, 160]);
  line(new Date(dish.generated_at).toLocaleString("de-DE"), 8, "normal", [180, 180, 180]);

  const filename = dish.name.replace(/[^a-zA-ZäöüÄÖÜß0-9 \-]/g, "").trim().replace(/\s+/g, "_") + ".pdf";
  doc.save(filename);
}
