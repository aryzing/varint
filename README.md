# varint

Usage:

```ts
import { encode, decode } from "@aryzing/varint";

encode(1);     // Uint8Array(1) [ 1 ]
encode(127);   // Uint8Array(1) [ 127 ]
encode(128);   // Uint8Array(2) [ 128, 1 ]
encode(255);   // Uint8Array(2) [ 255, 1 ]
encode(300);   // Uint8Array(2) [ 172, 2 ]
encode(16384); // Uint8Array(3) [ 128, 128, 1 ]

decode(new Uint8Array([1]));           // 1n
decode(new Uint8Array([127]));         // 127n
decode(new Uint8Array([128, 1]));      // 128n
decode(new Uint8Array([255, 1]));      // 255n
decode(new Uint8Array([172, 2]));      // 300n
decode(new Uint8Array([128, 128, 1])); // 16384n
```



