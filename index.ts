// Encode a bigint into a VarInt represented by a Unit8Array
export function encode(value: bigint | number): Uint8Array {
  value = BigInt(value);

  if (value < 0n) {
    throw new Error("Number must be non-negative");
  }

  const result = [];
  while (true) {
    const byte = Number(value & 0x7fn);
    value >>= 7n;
    if (value === 0n) {
      result.push(byte);
      break;
    }
    result.push(byte | 0x80);
  }
  return new Uint8Array(result);
}

// Decode a VarInt represented by a Unit8Array into a bigint
export function decode(bytes: Uint8Array): bigint {
  let result = 0n;
  let shift = 0n;
  for (const byte of bytes) {
    result |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) {
      return result;
    }
    shift += 7n;
  }
  throw new Error("VarInt did not terminate");
}
