// lib/compatibility.ts
import { Build } from "@/types";

export interface CompatibilityResult {
  ok: boolean;
  issues: string[];
  warnings: string[];
  estimatedWattage: number;
}

export function checkCompatibility(build: Partial<Build>): CompatibilityResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  let estimatedWattage = 0;

  const cpu = build.cpu;
  const motherboard = build.motherboard;
  const ram1 = build.ram1;
  const ram2 = build.ram2;
  const gpu = build.gpu;
  const psu = build.psu;
  const storage1 = build.storage1;
  const storage2 = build.storage2;
  const pcCase = build.case;

  // 1. CPU + Motherboard socket
  if (cpu && motherboard) {
    if (cpu.socket && motherboard.socket && cpu.socket !== motherboard.socket) {
      issues.push(`Socket incompatibil: CPU (${cpu.socket}) ≠ Placă de bază (${motherboard.socket})`);
    }
  }

  // 2. Estimare consum (TDP)
  if (cpu?.tdp) estimatedWattage += cpu.tdp;
  if (gpu?.tdp) estimatedWattage += gpu.tdp;
  estimatedWattage += 100; // RAM + MB + storage + fans

  // 3. PSU suficient?
  if (psu && psu.wattage) {
    const recommended = estimatedWattage + 150; // +50–100W marjă sigură
    if (psu.wattage < estimatedWattage) {
      issues.push(`PSU prea slab! Ai nevoie de minim ${recommended}W (ai ${psu.wattage}W)`);
    } else if (psu.wattage < recommended) {
      warnings.push(`PSU la limită – recomandat minim ${recommended}W pentru stabilitate`);
    }
  }

  // 4. RAM compatibilitate (DDR4 vs DDR5)
  if ((ram1 || ram2) && motherboard) {
    const ramType = ram1?.type || ram2?.type || "DDR4";
    const moboRamType = motherboard.ramType || "DDR4";

    if (ramType !== moboRamType) {
      issues.push(`Tip RAM incompatibil: RAM ${ramType} ≠ Placă de bază ${moboRamType}`);
    }
  }

  // 5. GPU fizic – lungime vs case
  if (gpu?.length && pcCase?.maxGpuLength) {
    if (gpu.length > pcCase.maxGpuLength) {
      issues.push(`GPU prea lung: ${gpu.length}mm > Carcasă suportă ${pcCase.maxGpuLength}mm`);
    }
  }

  // 6. Storage M.2 slots
  if ((storage1?.type === "M.2" || storage2?.type === "M.2") && motherboard) {
    const m2slots = motherboard.m2slots || 1;
    const m2used = [storage1, storage2].filter(s => s?.type === "M.2").length;
    if (m2used > m2slots) {
      warnings.push(`Ai ${m2used} SSD-uri M.2, dar placa de bază are doar ${m2slots} sloturi`);
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    warnings,
    estimatedWattage: Math.ceil(estimatedWattage),
  };
}