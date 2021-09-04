# SNBT_Constructor
A Javascript class for creating Stringified Named Binary Tag (SNBT) strings, a common format used in Minecraft Java edition.
For more information about SNBT [click here](https://minecraft.fandom.com/wiki/NBT_format#SNBT_format).

## Data Types:
	byte = Int from -128 to 127;
	short = Int from -32,768 to 32,767;
	int = Ints from -2,147,483,648 to 2,147,483,647;
	long = Ints from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807;
	float = Float values, cannot be Int;
	double = Float values, cannot be Int;
	string = String;
	list = Array which may only contain one data type;
	compound = SNBT_Constructor object;
	byte_array = Array containing only Ints from -128 to 127;
	int_array = Array containing only Ints from -2,147,483,648 to 2,147,483,647;
	long_array = Array containonyl only Ints from from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807;
	boolean = Boolean, True or False;

## Functions:

### add(type: {STRING data_type}, key: {STRING}, data: {Any accepted NBT data type})
Add will add tagged data to the SNBT object.

### get_key(key: {STRING})
Get_key will return the value of the key in the SNBT object.
<br>It also returns 'undefined' if it could not find the key.

### delete_key(key: {STRING})
Delete_key will delete the key from the SNBT object and return true.
<br>If it could not find the key it returns false.

### change_data(type: {STRING data_type}, key: {STRING}, data: {Any accepted NBT data type})
Change_data will delete the old key if found and add a new key to take it's place.
<br>If it could not find the key it will throw an error.
<br>*I may change this function to maintain the original key's data type when changing data.*

### clear()
Clear will completely clear the SNBT object's data.
	
### stringify()
Stringify will convert the SNBT object into a plain text string.
<br>It mimics the same Stringified NBT format found in Minecraft.
<br>*It is possible to recursivly add SNBT objects together when using the Compound data type which may result in max stack calls.*
	
