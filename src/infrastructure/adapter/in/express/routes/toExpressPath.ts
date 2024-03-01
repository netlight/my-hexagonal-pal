/**
 * Reformats an OpenAPI defined path to a by Express readable path
 * I.e. rewrites path param notation from OpenAPI format to Express format
 * @param openApiPath The in the OpenAPI spec defined path
 */
const toExpressPath = (openApiPath: string): string =>
  openApiPath.replaceAll(/({)(.*)(})/g, ":$2");

export default toExpressPath;
