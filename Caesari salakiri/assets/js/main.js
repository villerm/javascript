function docReady(){
    var $ = function(id){ return document.getElementById(id) },
    inputText = $("inputText"),
    step = $("step"),
    output = $("output"),
    alphabet = "ABCDEFGHIJKLMNOPQRSŠZŽTUVWÕÄÖÜXY",
    len = alphabet.length,
    encrypt = ($("encrypt")),
    decrypt = ($("decrypt"));

    inputText.addEventListener("change", updateValue);
    step.addEventListener("change", updateValue);
    encrypt.addEventListener("change", updateValue);
    decrypt.addEventListener("change", updateValue);

    function updateValue() {
        if (step.value.length > 0 && inputText.value.length > 0){
            amount = step.value *1;
            input = inputText.value.trim().toUpperCase();
            if(encrypt.checked)amount=-amount;
            if (amount < 0) amount += len;
            caesar(input,amount);
        }
    }
    function caesar(input, step){
            if (step < 0){
                return caesar(input, step + 26);
            }
            var result = "";
            for (i=0; i < input.length; i++) {
                char = input.charAt(i);
                index = alphabet.search(char)
                if (index == -1) result += char;
                result += alphabet.charAt( (index  + step) % len );
            }
            output.value = result;
    }
};