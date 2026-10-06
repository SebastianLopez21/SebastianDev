# DESIGN.md — Dirección de Arte, Tokens y Física de Movimiento

> **Documento de Reglas de Diseño Duraderas (Impeccable + Emil Kowalski Design Engineering)**  
> Todo agente o desarrollador que modifique la interfaz debe respetar estrictamente estas directrices.

---

## 1. Modo de Superficie (Impeccable Modes)
* **Modo Principal:** `Persuade` $\times$ `Experience`
* **Intención:** El visitante siente de inmediato que está ante un ingeniero de software de alto nivel. La estética no es ornamental; demuestra precisión, control de rendimiento y maestría técnica desde el primer viewport.

---

## 2. Dirección Visual & Atmósfera (Anti-Slop AI)
* **Estilo:** *Cinematic Dark Engineering*.
* **Fondo Base:** `#090A0F` (Matiz profundo de zinc con tinte cian ambiental; prohibido el negro `#000000` plano).
* **Superficies Elevadas:** `#0F121C` con bordes sutiles de 1px (`rgba(248, 250, 252, 0.08)`).
* **Profundidad & Iluminación:** Sombras tintadas con el acento (`rgba(6, 182, 212, 0.20)` en lugar de gris muerto `#00000020`), complementadas con resplandores *aurora mesh* suaves.

---

## 3. Jerarquía Tipográfica y Ritmo
* **Display / Títulos:** `'Outfit', sans-serif`
  * *Tracking:* Negativo `-0.03em` (`tracking-tight`) para dar sensación compacta y sofisticada.
  * *Alineación de texto:* `text-wrap: balance` en todos los titulares principales.
  * *Pesos:* 600 (Semi-bold) y 800 (Extra-bold).
* **Cuerpo / Lectura:** `'Plus Jakarta Sans', sans-serif`
  * *Line-height:* `1.6` a `1.7` para evitar fatiga en lectura técnica.
  * *Pesos:* 400 (Regular) y 500 (Medium).
* **Métricas & Datos de Rendimiento:** `'JetBrains Mono', monospace`
  * Utilizado para latencias, códigos de estado, comandos y cifras de producción.

---

## 4. Paleta Semántica de Tokens

```css
:root {
  /* Fondos y Superficies */
  --bg-deep:             #090A0F;
  --bg-surface:          #0F121C;
  --bg-surface-raised:   #151928;
  --border-subtle:       rgba(248, 250, 252, 0.08);
  --border-hover:        rgba(6, 182, 212, 0.40);

  /* Texto */
  --text-main:           #F8FAFC;
  --text-muted:          #94A3B8;
  --text-subtle:         #64748B;

  /* Acentos Cromáticos */
  --accent-cyan:         #06B6D4; /* Acento de interacción y botones primarios */
  --accent-indigo:       #6366F1; /* Resplandores y badges secundarios */
  --status-emerald:      #10B981; /* Disponibilidad activa y métricas óptimas */
  --status-amber:        #F59E0B; /* Advertencias y tags de catálogo */

  /* Sombras Tintadas Modernas */
  --shadow-tinted-cyan:  0 12px 36px -8px rgba(6, 182, 212, 0.25);
  --shadow-card:         0 8px 30px -4px rgba(0, 0, 0, 0.5);
}
```

---

## 5. Reglas Inquebrantables de Movimiento (Emil Kowalski Physics)

Toda animación o transición debe comportarse bajo leyes de la física y el rigor de *Design Engineering*:

| Regla de Emil Kowalski | Lo que está Prohibido ❌ | Lo que es Obligatorio ✔ | Por qué es importante |
|---|---|---|---|
| **Propiedades Explícitas** | `transition: all 300ms` | `transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms` | Evita recalcular *layout/reflow* innecesario en el navegador. |
| **Entradas Físicas Realistas** | `transform: scale(0)` | `transform: scale(0.95); opacity: 0` $\rightarrow$ `scale(1); opacity: 1` | Nada en el mundo físico emerge desde el vacío absoluto. |
| **Curvas de Entrada** | `ease-in` en popovers o modales | `ease-out` o `cubic-bezier(0.16, 1, 0.3, 1)` | `ease-in` se siente perezoso; la interfaz debe reaccionar de inmediato al clic. |
| **Feedback Táctil en Botones** | Botón estático sin feedback | `:active { transform: scale(0.97); }` | El usuario debe sentir físicamente que presionó el elemento. |
| **Origen de Transformación** | `transform-origin: center` en dropdowns | `transform-origin: top left` (desde el botón que lo activó) | La mente del usuario espera que el menú nazca de donde hizo clic. |
| **Aceleración GPU** | Animar `height`, `width` o `top` | Animar exclusivamente `transform` y `opacity` | Garantiza 60 a 120 FPS sin caídas de frames (*jank*). |

---

## 6. Layout Archetype: Bento Grid de 4 Columnas

El Hero y las secciones de proyectos usan un diseño asimétrico tipo Bento Grid:
* **Tarjeta 1 (Hero Principal 2x2):** Posicionamiento, propuesta de valor y CTA principal.
* **Tarjeta 2 (1x1 Métrica en Vivo):** Indicador de latencia p95 `< 85ms` con badge animado en esmeralda.
* **Tarjeta 3 (1x1 Stack Activo):** Badges interactivos de .NET 9, Angular 22, Neon Postgres, Docker.
* **Tarjeta 4 (2x1 Cotizador de Software):** Widget reactivo con cálculo en tiempo real y cierre a WhatsApp.
