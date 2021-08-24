# NodeJS Benchmark

Tests:
- Reading huge text files
- Writing huge text files
- Text encoding
- Text decoding
- Password hashing
- Password hash comprasion
- Image resize/blur
- Image generation
- Reading images
- Writing images

Libraries used:
- fs
- sharp
- bcrypt
- crypto

Supported architectures:
- x86 (AMD, Intel)
- ARM (Apple Silicon, Raspberry Pi, Qualcomm and etc)
- VLIW* (МЦСТ Эльбрус)

Thanks a lot @powerdot for JS code base!

## How to install
### Install NodeJS from official website (Current or LTS)

https://nodejs.org/

### Install dependencies
```bash
npm install
```

## Benchmark

### Full
Full test.
```bash
npm run full
```

### Only specific load 
How fast is your server with big text files, images and encryption?
```bash
npm run loadtest
```

### Only load with requests Web-server
How fast is your server can response to queries?
```bash
npm run queries
```


