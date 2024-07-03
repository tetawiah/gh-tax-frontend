import { Allowance } from "@/interfaces/Allowance";

export function getTaxableAmount(netSalary: number): number[] {
  const taxable = [365, 110, 130, 3000, 16395, 20000];
  const taxRate = [0, 0.05, 0.1, 0.175, 0.25, 0.30];

let totalTaxable = 0;
let netIncome = 0;
let totalTaxPaid = 0;

for (let i = 0; i < taxable.length; i++) {
  let grossWithinBracket = taxable[i];
  let taxPaid = taxRate[i] * grossWithinBracket;
  let netWithinBracket = grossWithinBracket - taxPaid;

  if (netIncome + netWithinBracket < netSalary) {
    netIncome += netWithinBracket;
    totalTaxable += grossWithinBracket;
    totalTaxPaid += taxPaid;
  } 
  else {
    let remainingNetIncome = netSalary - netIncome;
    let remainingGrossWithinBracket = remainingNetIncome / (1 - taxRate[i]);
    let remainingTaxPaid = remainingGrossWithinBracket * taxRate[i];

    netIncome += remainingNetIncome;
    totalTaxable += remainingGrossWithinBracket;
    totalTaxPaid += remainingTaxPaid;
    break;
  }
}    return [totalTaxable, totalTaxPaid];
}


export function getGrossSalary(taxableAmount: number): number {
  const totalAfterEmployeeContribution = 0.895
    return taxableAmount / totalAfterEmployeeContribution;
}

export function getBasicSalary(gross: number, totalAllowances: number): number {
    return gross - totalAllowances;
}

export function sumAllowances(allowances: Allowance[]): number {
  return allowances.reduce((acc, curr) => acc + curr.amount, 0);
}

export function getEmployerContribution(basicSalary : number): number {
   return 0.18 * basicSalary;
}

export function getEmployeeContribution(basicSalary: number): number {
  return 0.105 * basicSalary;
}