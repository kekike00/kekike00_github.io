var canvas = document.querySelector("canvas");
   /* document.body.appendChild(canvas);*/
    var width = canvas.width = window.innerWidth;//document.body.innerWidth;
    var height = canvas.height = window.innerHeight;//document.body.innerHeight;
    var startTime = (new Date()).getTime();

    var gl = Glut.getGL(canvas);
    gl.program = Glut.getProgram(gl, "vertex-shader", "fragment-shader");
    var glVars = Glut.getGLVars(gl, gl.program, {
        attributes: ["aVertexPosition"],
        uniforms: ["uTime", "uRes"]
    });

    Glut.setBuffer(gl, glVars.aPosition, new Float32Array([
        -1, 1,
        -1, -1,
        1, -1,
        1, -1,
        1, 1,
        -1, 1
    ]), 2);

    gl.uniform2fv(glVars.uRes, [width, height]);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    (function drawScene() {
        requestAnimationFrame(drawScene);
        var time = (new Date()).getTime() - startTime;

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(glVars.uTime, time * 0.001);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    })();

    window.onresize = function () {
        width = canvas.width = window.innerWidth;
    		height = canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2fv(glVars.uResolution, [width, height]);
    }
