import { type UniqueIdGenerator } from "../../core/domain/model/uniqueId";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const uuidGenerator: UniqueIdGenerator = {
  generate: uuidv4,
  validate: uuidValidate,
};

export default uuidGenerator;
