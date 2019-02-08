// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    //ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}

// ========== fill the grid using Wolfram-150 cellular automaton rule ==========
function cella_150( rctx, x_number, y_number, fillcolor ) {
    // initialize the seed to black
    rctx.fillStyle = fillcolor;
    rctx.fillRect(x_number, y_number, 10, 10);

    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    
    let cells = Array(40);
    for (var i = 0; i < 40; i+=1 ) {
        cells[i]=0;
    }
    cells[19]=1;

    for (var iy = 10; iy < height; iy += 10 ) {
        for (var ix = 0; ix < width; ix += 10) {
            var next_state = check_neighbors( ix, cells);
            if (next_state == 1) {
                rctx.fillStyle = 'black';
                rctx.fillRect(ix, iy, 10, 10);
            }
            else {
                //rctx.fillStyle = 'white';
                //rctx.fillRect(ix, iy, 10, 10);
            }
        }
    }
}


// return the apt rule from the ruleset after checking the neighbors
function check_neighbors( ix, cells ) {
    // treat non-existential neighbors as in the off state
    let ruleset = [1, 0, 0, 1, 0, 1, 1, 0];
    // if we are looking at (100, 50), then we need to check the 10th cell
    var current = ix/10;
    var lstate = cells[current-1];
    var cstate = cells[current];
    var rstate = cells[current+1];
    console.log(current, lstate, cstate, rstate);
    if (lstate == 1 && cstate == 1 && rstate == 1) return ruleset[0];
    if (lstate == 1 && cstate == 1 && rstate == 0) return ruleset[1];
    if (lstate == 1 && cstate == 0 && rstate == 1) return ruleset[2];
    if (lstate == 1 && cstate == 0 && rstate == 0) return ruleset[3];
    if (lstate == 0 && cstate == 1 && rstate == 1) return ruleset[4];
    if (lstate == 0 && cstate == 1 && rstate == 0) return ruleset[5];
    if (lstate == 0 && cstate == 0 && rstate == 1) return ruleset[6];
    if (lstate == 0 && cstate == 0 && rstate == 0) return ruleset[7];

    return 0;
}
