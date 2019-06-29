/**
 * @exports
 * @Unique ID
 */

const generate = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

const formGuid = () => `${generate() + generate()}-${generate()}-${generate()}-${
  generate()}-${generate()}${generate()}${generate()}`;

const guid = formGuid();

export default guid;
