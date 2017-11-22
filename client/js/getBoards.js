function getBoard(board) {
    var upload = JSON.stringify({
        board_id: board
    });

    var url = 'http://localhost:3000/users/getboard';

    var cfg = {
        method: "POST",
        body: upload
    }

    superfetch(url, "json", succ, error, cfg);
    
}
