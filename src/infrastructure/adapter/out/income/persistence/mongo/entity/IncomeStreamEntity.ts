import type EarningEntity from "./EarningEntity";

interface IncomeStreamEntity {
  id: string;
  name: string;
  earnings: EarningEntity[];
}

export default IncomeStreamEntity;
