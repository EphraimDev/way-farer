/**
 * @exports
 * @Unique ID
 */
class GUID {
  static generate(){ 
    return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
          };

static formGuid () { return `${GUID.generate() + GUID.generate()}-${GUID.generate()}-${GUID.generate()}-${
  GUID.generate()}-${GUID.generate()}${GUID.generate()}${GUID.generate()}`;
}

}


export default GUID;
