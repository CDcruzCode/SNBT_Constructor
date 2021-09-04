class SNBT_Constructor {

  static DATA_TYPE = [
  'byte',
  'short',
  'int',
  'long',
  'float',
  'double',
  'string',
  'list',
  'compound',
  'byte_array',
  'int_array',
  'long_array',
  'boolean'
  ];

  #snbt_array;

  constructor() {
    this.#snbt_array = [];
  }

  #between(x, min, max) {
  return x >= min && x <= max;
  }

  #isFloat(x) {
    // check if the passed value is a number
    if(typeof x == 'number' && !isNaN(x)){
        // check if it is integer
        if (Number.isInteger(x)) {
            //console.log(`${x} is integer.`);
            return false;
        }
        else {
            //console.log(`${x} is a float value.`);
            return true;
        }
    } else {
        //console.log(`${x} is not a number`);
        return false;
    }
  }

  clear() {
    this.#snbt_array = [];
  }

  get_key(key) {
    if(typeof(key) != "string") {
      throw new Error(`Key must be of type String. Was ${typeof(key)}`);
    }
    key = key.trim().toLowerCase();
    var arr = this.#snbt_array.filter( function( el ) {
    return !!~el[1].indexOf( key );
    } );

    if(arr.length == 0) {
      return undefined;
    } else {
      return arr[0][2];
    }
  }

  delete_key(key) {
    if(typeof(key) != "string") {
      throw new Error(`Key must be of type String. Was ${typeof(key)}`);
    }
    key = key.trim().toLowerCase();
    for( var i = 0; i < this.#snbt_array.length; i++){
        if ( this.#snbt_array[i][1] === key) {
            this.#snbt_array.splice(i, 1);
            //--;
            return true;
        }
      }
      return false;
    }

    change_data(type, key, data) {
      if(this.delete_key(key)) {
        this.add(type, key, data);
        return true;
      }
      throw new Error(`Key could not be found.`);
    }

  #is_key_unique(key) {
    var arr = this.#snbt_array.filter( function( el ) {
    return !!~el[1].indexOf( key );
    } );

    if(arr.length > 0) {
      return false;
    } else {
      return true;
    }
  }


  add(type, key, data) {
    type = type.trim().toLowerCase();

    if(typeof(key) != "string") {
      throw new Error(`Key must be of type String. Was ${typeof(key)}`);
    }
    key = key.trim().toLowerCase();
    if( !this.#is_key_unique(key) ) {
      throw new Error(`Key value must be unique.`);
    }

      switch (type) {
        case "byte":
          if(!Number.isInteger(data)) {
            throw new Error(`Byte data must be an Int value. Was ${typeof(data)}`);
          } else if (!this.#between(data, -128, 127)) {
            throw new Error("Byte data must only be values from -128 to 127");
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "short":
          if(!Number.isInteger(data)) {
            throw new Error(`Short data must be an Int value. Was ${typeof(data)}`);
          } else if (!this.#between(data, -32768, 32767)) {
            throw new Error("Short data must only be values from -32,768 to 32,767");
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "int":
          if(!Number.isInteger(data)) {
            throw new Error(`Int data must be an Int value. Was ${typeof(data)}`);
          } else if (!this.#between(data, -2147483648, 2147483647)) {
            throw new Error("Int data must only be values from -2,147,483,648 to 2,147,483,647");
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "long":
          if(!Number.isInteger(data)) {
            throw new Error(`Long data must be an Int value. Was ${typeof(data)}`);
          } else if (!this.#between(data, -9223372036854775808, 9223372036854775807)) {
            throw new Error("Long data must only be values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807");
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "float":
          if(!this.#isFloat(data)) {
            throw new Error(`Float data must be a Float value.`);
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "double":
          if(!this.#isFloat(data)) {
            throw new Error(`Doubtl data must be a Float value.`);
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "string":
          if(typeof data != 'string' || !data instanceof String) {
            throw new Error(`String data must be a String value. Was ${typeof(data)}`);
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "list":
          if(!Array.isArray(data)) {
            throw new Error("List data must be in the form of an Array");
          }
          let list_type = typeof(data[0]);
          let list_string = "";
          //console.log(`List type is: ${list_type}`);
          for (var i = 0; i < data.length; i++) {
            if(typeof(data[i]) !== list_type) {
              throw new Error("Cannot have mixed data types in an NBT List type.");
            }

            if(typeof(data[0]) === 'string') {
              list_string += `'${data[i].replaceAll(`'`, `\\'`)}'`;
            } else {
              list_string += data[i];
            }

            if((data.length - 1) != i) {
              list_string += ",";
            }
          }

          this.#snbt_array.push( [type, key, list_string] );
          break;
        case "compound":
          if(!data instanceof SNBT_Constructor) {
            throw new Error(`Compound data must be an object value of class SNBT_Constructor.`);
          }

          this.#snbt_array.push( [type, key, data] );
          break;
        case "byte_array":
          if(!Array.isArray(data)) {
            throw new Error("Byte Array data must be in the form of an Array");
          }
          for (var i = 0; i < data.length; i++) {
            if(!Number.isInteger(data[i])) {
              throw new Error(`A value in the Byte Array was not an integer.`);
            } else if (!this.#between(data[i], -128, 127)) {
              throw new Error("Byte Array: Byte data must only be values from -128 to 127");
            }
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "int_array":
            if(!Array.isArray(data)) {
              throw new Error("Int Array data must be in the form of an Array");
            }
            for (var i = 0; i < data.length; i++) {
              if(!Number.isInteger(data[i])) {
                throw new Error(`A value in the Int Array was not an integer.`);
              } else if (!this.#between(data[i], -2147483648, 2147483647)) {
                throw new Error("Int Array: Int data must only be values from -2,147,483,648 to 2,147,483,647");
              }
            }
            this.#snbt_array.push( [type, key, data] );
            break;
          case "long_array":
          if(!Array.isArray(data)) {
            throw new Error("Long Array data must be in the form of an Array");
          }
          for (var i = 0; i < data.length; i++) {
            if(!Number.isInteger(data[i])) {
              throw new Error(`A value in the Long Array was not an integer.`);
            } else if(!this.#between(data[i], -9223372036854775808, 9223372036854775807)){
              throw new Error("Long Array: Long data must only be values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807");
            }
          }
          this.#snbt_array.push( [type, key, data] );
          break;
        case "boolean":
          if( typeof(data) !== 'boolean') {
            throw new Error(`Boolean data must be a Boolean value. Was ${typeof(data)}`);
          }
          this.#snbt_array.push( [type, key, data ? 1 : 0] );
          break;
        default:
          throw new Error("Data Type not valid.\nCan only support:\n'byte','short','int','long','float','double','string','list','compound','byte_array','int_array','long_array','boolean'");

      }

    }

    stringify() {
      let snbt_string = "{"
      console.log(this.#snbt_array);

      for (var i = 0; i < this.#snbt_array.length; i++) {

        switch (this.#snbt_array[i][0]) {
          case "byte":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}b`;
            break;
          case "short":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}s`;
            break;
          case "int":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}`;
            break;
          case "long":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}l`;
            break;
          case "float":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}f`;
            break;
          case "double":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}d`;
            break;
          case "string":
            snbt_string += `${this.#snbt_array[i][1]}:"${this.#snbt_array[i][2]}"`;
            break;
          case "list":
            snbt_string += `${this.#snbt_array[i][1]}:[${this.#snbt_array[i][2]}]`;
            break;
          case "compound":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2].stringify()}`;
            break;
          case "byte_array":
            let byte_array_string = ""
            let byte_array = this.#snbt_array[i][2];
            for (var a = 0; a < byte_array.length; a++) {
              byte_array_string += `${byte_array[a]}b`;
              if((byte_array.length - 1) != a) {
                byte_array_string += ",";
              }
            }
            snbt_string += `${this.#snbt_array[i][1]}:[B;${byte_array_string}]`;
            break;
          case "int_array":
            let int_array_string = ""
            let int_array = this.#snbt_array[i][2];
            for (var a = 0; a < int_array.length; a++) {
              int_array_string += `${int_array[a]}`;
              if((int_array.length - 1) != a) {
                int_array_string += ",";
              }
            }
            snbt_string += `${this.#snbt_array[i][1]}:[I;${int_array_string}]`;
            break;
          case "long_array":
            let long_array_string = ""
            let long_array = this.#snbt_array[i][2];
            for (var a = 0; a < long_array.length; a++) {
              long_array_string += `${long_array[a]}l`;
              if((long_array.length - 1) != a) {
                long_array_string += ",";
              }
            }
            snbt_string += `${this.#snbt_array[i][1]}:[L;${long_array_string}]`;
            break;
          case "boolean":
            snbt_string += `${this.#snbt_array[i][1]}:${this.#snbt_array[i][2]}b`;
            break;
          default:
            throw new Error("Data Type not valid.\nCan only support 'byte','short','int','long','float','double','string','list','compound','int_array','long_array','boolean'");

        }

        if((this.#snbt_array.length - 1) != i) {
          snbt_string += ",";
        }

      }


      snbt_string += "}";
      console.log(snbt_string);
      return snbt_string;
    }


}
