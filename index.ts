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

decode(new Uint8Array([1]));
decode(new Uint8Array([127]));
decode(new Uint8Array([128, 1]));
decode(new Uint8Array([255, 1]));
decode(new Uint8Array([172, 2]));
decode(new Uint8Array([128, 128, 1]));
