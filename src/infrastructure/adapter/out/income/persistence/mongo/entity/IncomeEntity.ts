import type IncomeSourceEntity from "./IncomeSourceEntity";

interface IncomeEntity {
  id: string;
  name: string;
  sources: IncomeSourceEntity[];
}

export default IncomeEntity;
