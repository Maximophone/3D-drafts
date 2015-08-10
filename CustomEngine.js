var CEngine;
(function CEngine(){
	var Mesh = (function(){
		function Mesh(v)
		{
			this.vertices = v;
		}
		return Mesh;
	})
	CEngine.Mesh = Mesh;
	var Camera = (function(){
		function Camera(p)
		{
			this.position = p;
		}
		return Camera;
	})
	CEngine.Camera = Camera;
	var Dev = (function(){
		function Dev(canvas)
		{
			this.canvas = canvas;
			this.context = canvas.getContext("2d");
			this.width = canvas.width;
			this.height = canvas.height;
			this.depthbuffer = new Array(this.width * this.height);
		}
		Dev.prototype.clear = function()
		{
			this.context.clearRect(0,0,this.width,this.height);
			this.backbuffer = this.context.getImageData(0,0,this.width,this.height);
			for(var i = 0; i<this.depthbuffer.length; ++i)
			{
				this.depthbuffer[i]=Infinity;
			}
		}
		Dev.prototype.putPixel = function(x,y,z,color)
		{
			this.backbufferdata = this.backbuffer.data;

            var index = ((x >> 0) + (y >> 0) * this.width);
            var index4 = index * 4;

            if (this.depthbuffer[index] < z) {
                return;
            }

            this.depthbuffer[index] = z;

            this.backbufferdata[index4] = color.r * 255;
            this.backbufferdata[index4 + 1] = color.g * 255;
            this.backbufferdata[index4 + 2] = color.b * 255;
            this.backbufferdata[index4 + 3] = color.a * 255;
		}
		Dev.prototype.drawPoint = function (point, color) {
            if (point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height) {
                this.putPixel(point.x, point.y, point.z, color);
            }
        };
        Dev.prototype.present = function () {
            this.context.putImageData(this.backbuffer, 0, 0);
        };
		return Dev;
	})
})(CEngine || (CEngine = {}));