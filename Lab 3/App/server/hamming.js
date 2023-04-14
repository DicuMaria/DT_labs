function decode(bits) {
	parity = function (nb) {
		return nb % 2;
	}
	if (bits.length == 8) {
		var z4 = parity(bits[4] + bits[5] + bits[6] + bits[7]);
		var z2 = parity(bits[2] + bits[3] + bits[6] + bits[7]);
		var z1 = parity(bits[1] + bits[3] + bits[5] + bits[7]);
		var sum = 0;
		i = 0;
		while (i < bits.length) {
			sum += bits[i];
			i++;
		}
		var zp = parity(sum);//for no errors
		var errorPosition = z1 * 1 + z2 * 2 + z4 * 4;
		var errorDetected = false;
		if (errorPosition != 0) errorDetected = true;

		if ((zp == 0) && (errorPosition == 0) && (errorDetected == false)) {
			return {
				bits: bits,
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1
			};
		} else if ((zp == 0) && (errorPosition != 0) && (errorDetected == true)) {
			return {
				bits: bits,
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1
			};
		} else if ((zp == 1) && (errorPosition == 0) && (errorDetected == false)) {
			return {
				bits: bits, errorCorrected: errorDetected, errorPosition: 0
			};
		} else if ((zp == 1) && (errorPosition != 0) && (errorDetected == true)) {
			return {
				bits: bits,
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1
			};
		}

		if (errorDetected) {
			bits[errorPosition - 1] = parity(bits[errorPosition - 1] + 1);
		}
		return {
			errorCorrected:
				errorDetected, errorPosition:
				errorPosition - 1 + 1, bits: bits
		};
	} else if (bits.length === 13) {

		var z8 = parity(bits[8] + bits[9] + bits[10] + bits[11] + bits[12]);
		var z4 = parity(bits[4] + bits[5] + bits[6] + bits[7] + bits[12]);
		var z2 = parity(bits[2] + bits[3] + bits[6] + bits[7] + bits[10] + bits[11]);
		var z1 = parity(bits[1] + bits[3] + bits[5] + bits[7] + bits[9] + bits[11]);
		var sum = 0;
		i = 0;
		while (i < bits.length) {
			sum = sum + bits[i];
			i++;
		}

		//this part is for parity
		var zp = parity(sum) //for no errors zp=0
		var errorPosition = z1 * 1 + z2 * 2 + z4 * 4;
		var errorDetected = false;
		if (errorPosition != 0) errorDetected = true;

		if ((zp == 0) && (errorPosition == 0) && (errorDetected == false)) {
			return {
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1,
				bits: bits
			};
		} else if ((zp == 0) && (errorPosition != 0) && (errorDetected == true)) {
			return {
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1,
				bits: bits
			};
		} else if ((zp == 1) && (errorPosition == 0) && (errorDetected == false)) {
			return {
				errorCorrected: errorDetected,
				errorPosition: 0,
				bits: bits
			};
		} else if ((zp == 1) && (errorPosition != 0) && (errorDetected == true)) {
			return {
				errorCorrected: errorDetected,
				errorPosition: errorPosition - 1 + 1,
				bits: bits
			};
		}
	}
}

exports.decode = decode;