class Puissance4 {


    constructor(rows = 6, cols = 7, p1 = 'red', p2 = 'yellow') {

        this.rows = rows;
        this.cols = cols;
        this.p1 = p1;
        this.p2 = p2;

        this.grille();
    }


    grille = () => {
        let grille = document.createElement('div');
        grille.id = 'grille';
        document.querySelector('#game').appendChild(grille)
        $('#formOption').hide();


        for (let i = 0; i < this.cols; i++) {
            let cols = document.createElement('div');
            cols.className = 'colonne';
            cols.id = 'col' + i;
            document.querySelector('#grille').appendChild(cols)

            for (let u = 0; u < this.rows; u++) {

                let trou = document.createElement('div');
                trou.className = 'trou neutre';
                document.querySelector('#col' + i).appendChild(trou)

            }

        }

    }

    game = () => {
        document.querySelector('#start').addEventListener('click', () => {
            this.reset();
            let p1 = this.p1
            document.querySelector('#start').innerHTML = 'RESTART';
            $('#option').hide();
            $('#start').hide();



            let moves = document.createElement('p');
            moves.id = 'moves';
            moves.innerHTML = 'Move : 0';
            document.querySelector('#score').appendChild(moves)

            let turn = document.createElement('p');
            turn.id = 'turn';
            turn.innerHTML = 'Turn : Joueur 1';
            document.querySelector('#score').appendChild(turn)

            let trou = document.createElement('div');
            trou.id = 'p1';
            trou.classList.add("trouTurn");
            document.querySelector('#turn').appendChild(trou)
            $('.trouTurn').css('background-color', p1);

            this.pionColor();

        })
    }

    pionColor = () => {
        let move = 0;
        const self = this;
        const p1 = this.p1;
        const p2 = this.p2;

        $('.neutre').mouseover(function () {
            let coldivArray = $(this).parent().children().get();
            let i = 0;
            let verif = true;
            while (verif) {
                if ($(coldivArray[i]).attr('class').replace("trou ", "") == "neutre") {
                    $(coldivArray[i]).css('background-color', 'blue');
                    verif = false;

                }
                if ($(this).attr('class').replace("trou ", "") != "neutre") {
                    verif = false;

                }
                i++

            }

        })
        $('.neutre').mouseleave(function () {
            let coldivArray = $(this).parent().children().get();
            let i = 0;
            let verif = true;
            while (verif) {
                if ($(coldivArray[i]).attr('class').replace("trou ", "") == "neutre") {
                    $(coldivArray[i]).css('background-color', 'rgb(250, 250, 250)');
                    verif = false;

                }
                if ($(this).attr('class').replace("trou ", "") != "neutre") {
                    verif = false;

                }
                i++
            }


        })

        $('.neutre').click(function () {
            // this.FallAnimation();
            let coldivArray = $(this).parent().children().get();
            let i = 0;
            let verif = true;
            let allColArray = $(this).parent().parent().children().get();
            let cible;
            let allTrou = $('.trou').get();

            while (verif) {
                if ($(coldivArray[i]).attr('class').replace("trou ", "") == "neutre" && move % 2 == 0) {

                    $(coldivArray[i]).removeClass("neutre");
                    $(coldivArray[i]).css('background-color', p1);
                    $(coldivArray[i]).attr('id', 'p1');
                    move++

                    document.querySelector('#moves').innerHTML = 'Move : ' + move;
                    document.querySelector('#turn').innerHTML = "Turn : Joueur 2<div class='trouTurn'></div>";

                    $('.trouTurn').css('background-color', p2);

                    cible = coldivArray[i];
                    verif = false;
                }
                if ($(coldivArray[i]).attr('class').replace("trou ", "") == "neutre" && move % 2 != 0) {
                    $(coldivArray[i]).removeClass("neutre");
                    $(coldivArray[i]).css('background-color', p2);
                    $(coldivArray[i]).attr('id', 'p2');
                    move++

                    document.querySelector('#moves').innerHTML = 'Move : ' + move;
                    document.querySelector('#turn').innerHTML = "Turn : Joueur 1 <div class='trouTurn'></div>";

                    $('.trouTurn').css('background-color', p1);

                    cible = $(coldivArray[i]);
                    verif = false;
                }

                if ($(this).attr('class').replace("trou ", "") != "neutre") {
                    self.checkVertiWin(coldivArray)
                    self.checkHonrizonWin(cible, allColArray)
                    // self.checkDiagoWin(cible, allColArray)
                    return false;
                }

                i++
            }

            self.checkVertiWin(coldivArray)
            self.checkHonrizonWin(coldivArray, allColArray)
            // self.checkDiagoWin(cible, allColArray)
            // self.checkdraw(allTrou)
        });
    }

    reset = () => {


        if (document.querySelector('#start').innerHTML == 'RESTART') {
            location.reload()
        }
    }

    checkVertiWin = (coldivArray) => {
        let point1 = 0;
        let point2 = 0;
        const p1 = this.p1;
        const p2 = this.p2;

        coldivArray.forEach(element => {
            if ($(element).attr('id') == 'p1') {
                point1++;
                point2 = 0;
            }
            if ($(element).attr('id') == 'p2') {
                point2++;
                point1 = 0;
            }
        });

        if (point1 >= 4) {
            $('#grille').remove();
            $('#score').remove();
            $('#start').show();
            $('#option').show();


            let fin = document.createElement('h1');
            fin.innerHTML = 'CONGRATULATIONS: JOUEUR 1 GAGNE';
            fin.id = 'fin';
            document.querySelector('#game').appendChild(fin);
            $('#fin').css('color', p1);

            return false;
        }
        if (point2 >= 4) {
            $('#grille').remove();
            $('#score').remove();
            $('#start').show();
            $('#option').show();


            let fin = document.createElement('h1');
            fin.id = 'fin';
            fin.innerHTML = 'CONGRATULATIONS: JOUEUR 2 GAGNE';
            document.querySelector('#game').appendChild(fin);
            $('#fin').css('color', p2);
            return false;
        }
    }

    checkHonrizonWin = (coldivArray, allColArray) => {
        let point1 = 0;
        let point2 = 0;
        const p1 = this.p1;
        const p2 = this.p2;

        let row = -1;

        coldivArray.forEach(element => {
            if ($(element).attr('id') == 'p1' || $(element).attr('id') == 'p2') {
                row++;
            }
        });

        allColArray.forEach(element => {
            let colArray = $(element).children().get();

            if ($(colArray[row]).attr('id') == 'p1') {
                point1++;
                point2 = 0;
                console.log(point1);


            }
            if ($(colArray[row]).attr('id') == 'p2') {
                point2++;
                point1 = 0;
                console.log(point2);

            }
            if ($(colArray[row]).attr('class').replace("trou ", "") == "neutre") {
                point1 = 0;
                point2 = 0;

            }
            if (point1 >= 4) {
                $('#grille').remove();
                $('#score').remove();
                $('#start').show();
                $('#option').show();


                let fin = document.createElement('h1');
                fin.innerHTML = 'CONGRATULATIONS: JOUEUR 1 GAGNE';
                fin.id = 'fin';
                document.querySelector('#game').appendChild(fin);
                $('#fin').css('color', p1);

                return false;
            }
            if (point2 >= 4) {
                $('#grille').remove();
                $('#score').remove();
                $('#start').show();
                $('#option').show();


                let fin = document.createElement('h1');
                fin.id = 'fin';
                fin.innerHTML = 'CONGRATULATIONS: JOUEUR 2 GAGNE';
                document.querySelector('#game').appendChild(fin);
                $('#fin').css('color', p2);
                return false;
            }
        });


    }

    // checkDiagoWin = () => {

    //     let point1 = 0;
    //     let point2 = 0;


    //     if (point1 >= 4) {

    // $('#grille').remove();
    // $('#score').remove();
    // $('#start').show();
    // $('#option').show();

    //         let fin = document.createElement('h1');
    //         fin.innerHTML = 'JOUEUR 1 GAGNE';
    //         document.querySelector('#game').appendChild(fin)


    //     }
    //     if (point2 >= 4) {

    // $('#grille').remove();
    // $('#score').remove();
    // $('#start').show();
    // $('#option').show();

    //         let fin = document.createElement('h1');
    //         fin.innerHTML = 'JOUEUR 2 GAGNE';
    //         document.querySelector('#game').appendChild(fin)


    //     }
    // }

    checkdraw(allTrou) {

        let draw = 0;
        allTrou.forEach(element => {
            if ($(element).attr('class').replace("trou ", "") != "neutre") {
                draw = 1
            }

        });

        if (draw == 1) {
            $('#grille').remove();
            $('#score').remove();
            $('#start').show();
            $('#option').show();


            let fin = document.createElement('h1');
            fin.id = 'fin';
            fin.innerHTML = 'EGALITE LES NULOS !!';
            document.querySelector('#game').appendChild(fin);

        }

    }

    option() {

        document.querySelector('#option').addEventListener('click', () => {
            const self = this;
            $('#game').hide();
            $('#grille').remove();
            $('#start').hide();
            $('#option').hide();
            $('#formOption').show();

            let ok = document.createElement('button');
            ok.id = 'ok';
            ok.innerHTML = 'OK';
            document.querySelector('body').appendChild(ok);

            document.querySelector('#ok').addEventListener('click', function () {

                $('#formOption').hide();
                $('#ok').hide();
                $('#game').show();
                $('#start').show();



                self.p1 = $("#player1").val();
                self.p2 = $("#player2").val();
                self.rows = $("#ligne").val();
                self.cols = $("#colone").val();
                self.grille();
            });


        });

    }

    FallAnimation() {

    }
}

let party = new Puissance4();
party.game();
party.option();