export class Color {
  hex: string;

  constructor(
    hex: string
  ) {
    if (hex.length === 3) {
      hex = hex + hex;
    }

    this.hex = hex;
  }

  lightenColor(color: string, percentage: number): string {
    let r = Math.round(Math.min(255, parseInt(color.substring(1, 3), 16) * (1 + percentage))).toString(16);
    let g = Math.round(Math.min(255, parseInt(color.substring(3, 5), 16) * (1 + percentage))).toString(16);
    let b = Math.round(Math.min(255, parseInt(color.substring(5, 7), 16) * (1 + percentage))).toString(16);
    return "#" + (r.length<2 ? "0" + r : r) + (g.length<2 ? "0" + g : g) + (b.length<2 ? "0" + b : b);
  }

  hexAlpha(alpha: number): string {
    alpha = parseInt((alpha * 255).toFixed(0));

    if (alpha <= 0) {
      alpha = 0;
    } else if (alpha >= 255) {
      alpha = 255;
    }

    return this.hex + alpha.toString(16);
  }

  hexLighter(): string {
    return this.hexAlpha(.7);
  }

  static default(): Color {
    return new Color('#dedede');
  }

  static white(): Color {
    return new Color('#ffffff');
  }

  static pink(): Color {
    return new Color('#ffbefa');
  }

  static purple(): Color {
    return new Color('#e2beff');
  }

  static brown(): Color {
    return new Color('#c9a15f');
  }

  static red(): Color {
    return new Color('#ffbebe');
  }

  static green(): Color {
    return new Color('#c8ffc8');
  }

  static blue(): Color {
    return new Color('#b6b6ff');
  }

  static cyan(): Color {
    return new Color('#beffff');
  }

  static yellow(): Color {
    return new Color('#ffffa1');
  }

  static magenta(): Color {
    return new Color('#ffa6ff');
  }

  static orange(): Color {
    return new Color('#ffcb99');
  }

  static black(): Color {
    return new Color('#868686');
  }

  equals(color: Color): boolean {
    return this.hex === color.hex;
  }

  isDefault(): boolean {
    return this.equals(Color.default());
  }

}
