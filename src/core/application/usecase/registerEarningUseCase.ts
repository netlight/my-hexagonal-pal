import type { IncomeStreamId } from "../../domain/model/income/incomeStream";
import type { Earning } from "../../domain/model/income/earning";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";
import type { IncomeStreamApplicationService } from "../service/IncomeStreamApplicationService";

export type RegisterEarningUseCase = (
  incomeId: IncomeStreamId,
  earning: Earning,
) => Promise<Earning>;

const registerEarning: (
  ports: { persist: IncomeStreamPersistencePort["persist"] },
  appServices: { getIncomeStreamBy: IncomeStreamApplicationService["findBy"] },
) => RegisterEarningUseCase =
  (ports, appServices) => async (incomeId, earning) => {
    const incomeStream = await appServices.getIncomeStreamBy(incomeId);
    incomeStream.add(earning);
    const updatedIncomeStream = await ports.persist(incomeStream);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ok since we added the earning just before
    return updatedIncomeStream.findEarningBy(earning.id)!;
  };

export default registerEarning;
