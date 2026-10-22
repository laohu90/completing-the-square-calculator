# SquareMaster — Completing the Square Calculator & Step-by-Step Vertex Form Solver

A high-performance, SEO-optimized educational web application designed for US middle & high school students (Algebra 1, Algebra 2, Precalculus), teachers, and tutors.

Live Repository: [https://github.com/laohu90/completing-the-square-calculator](https://github.com/laohu90/completing-the-square-calculator)

---

## 🌟 Key Features

1. **Detailed Step-by-Step Algebraic Derivations**
   - Breaks down any quadratic $ax^2 + bx + c = 0$ or function $y = ax^2 + bx + c$ into 9 explicit, pedagogically structured steps.
   - Dual modes: **All Steps View** and interactive **Step Player (Step-by-Step Walkthrough)**.

2. **Targeting the #1 Student Struggle: Finding the Balancing Constant**
   - Dedicated spotlight breakdown for the "Magic Constant" $\left(\frac{b}{2a}\right)^2$:
     $$\text{Linear Coefficient } \frac{b}{a} \;\longrightarrow\; \text{Half } \frac{b}{2a} \;\longrightarrow\; \text{Square } \left(\frac{b}{2a}\right)^2$$
   - Prevents common pitfalls like forgetting to balance both sides or omitting the factor $a$.

3. **Geometric Area Proof (The Missing Corner / Algebra Tiles)**
   - Visualizes Al-Khwarizmi's geometric algebra model:
   - Slices the linear term $bx$ into two equal rectangles $\frac{b}{2}x$.
   - Positions them around the $x^2$ square to form an L-shape.
   - Highlights the missing corner square of area $\left(\frac{b}{2}\right)^2$ needed to complete $(x + b/2)^2$.
   - Interactive slider and auto-play animations.

4. **Dynamic SVG Parabola Graph**
   - Interactive coordinate plane with grid ticks.
   - Highlights the Vertex $(h, k)$, Axis of Symmetry $x = h$, and x-intercepts (roots).
   - Real-time zoom and pan controls.

5. **Practice & Quiz Challenge**
   - Interactive problems testing constant balancing, vertex coordinates, and binomial factoring.
   - Real-time score and streak tracking with celebratory confetti.

6. **Formula Cheat Sheet & Common Traps**
   - Standard Form vs. Vertex Form vs. Factored Form comparison.
   - Analysis of top 3 mistakes students make on Algebra exams.
   - Schema.org-aligned FAQ accordion.

7. **5-Language Internationalization**
   - **English (US)** (Default)
   - **Español**
   - **Français**
   - **Português**
   - **简体中文**

8. **Google Search Engine Optimization (SEO)**
   - Pre-configured `sitemap.xml` with multilingual `hreflang` tags.
   - `robots.txt` crawler configuration.
   - Embedded Schema.org JSON-LD structured data (`WebApplication`, `HowTo`, `FAQPage`).
   - One-click **Print / Save as PDF** stylesheet (`@media print`) for clean homework & worksheet handouts.
   - Shareable URL hashes storing equation state.

---

## 🚀 Quick Start & Development

```bash
# Clone repository
git clone https://github.com/laohu90/completing-the-square-calculator.git
cd completing-the-square-calculator

# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion + Canvas Confetti
- **Build Tool**: Vite
- **Mathematics Engine**: Custom exact Fraction arithmetic and radical simplifier.
