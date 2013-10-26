(function(){describe("Video",function(){var e;beforeEach(function(){jasmine.stubRequests();this.videosDefinition="0.75:7tqY6eQzVhE,1.0:cogebirgzzM";this["7tqY6eQzVhE"]="7tqY6eQzVhE";this.cogebirgzzM="cogebirgzzM"});afterEach(function(){window.OldVideoPlayer=undefined;window.onYouTubePlayerAPIReady=undefined;window.onHTML5PlayerAPIReady=undefined;$("source").remove()});describe("constructor",function(){describe("YT",function(){beforeEach(function(){loadFixtures("video.html");$.cookie.andReturn("0.75")});describe("by default",function(){beforeEach(function(){this.state=new window.Video("#example")});it("check videoType",function(){expect(this.state.videoType).toEqual("youtube")});it("reset the current video player",function(){expect(window.OldVideoPlayer).toBeUndefined()});it("set the elements",function(){expect(this.state.el).toBe("#video_id")});it("parse the videos",function(){expect(this.state.videos).toEqual({.75:this["7tqY6eQzVhE"],"1.0":this.cogebirgzzM})});it("parse available video speeds",function(){expect(this.state.speeds).toEqual(["0.75","1.0"])});it("set current video speed via cookie",function(){expect(this.state.speed).toEqual("0.75")})})});describe("HTML5",function(){var e;beforeEach(function(){loadFixtures("video_html5.html");this.stubVideoPlayer=jasmine.createSpy("VideoPlayer");$.cookie.andReturn("0.75")});describe("by default",function(){beforeEach(function(){e=new window.Video("#example")});afterEach(function(){e=undefined});it("check videoType",function(){expect(e.videoType).toEqual("html5")});it("reset the current video player",function(){expect(window.OldVideoPlayer).toBeUndefined()});it("set the elements",function(){expect(e.el).toBe("#video_id")});it("parse the videos if subtitles exist",function(){var t="Z5KLxerq05Y";expect(e.videos).toEqual({.75:t,"1.0":t,1.25:t,1.5:t})});it("parse the videos if subtitles do not exist",function(){var t="";$("#example").find(".video").data("sub","");e=new window.Video("#example");expect(e.videos).toEqual({.75:t,"1.0":t,1.25:t,1.5:t})});it("parse Html5 sources",function(){var t={mp4:null,webm:null,ogg:null},n=document.createElement("video");!!n.canPlayType&&!!n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/,"")&&(t.webm="xmodule/include/fixtures/test.webm");!!n.canPlayType&&!!n.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,"")&&(t.mp4="xmodule/include/fixtures/test.mp4");!!n.canPlayType&&!!n.canPlayType('video/ogg; codecs="theora"').replace(/no/,"")&&(t.ogg="xmodule/include/fixtures/test.ogv");expect(e.html5Sources).toEqual(t)});it("parse available video speeds",function(){var t=jasmine.stubbedHtml5Speeds;expect(e.speeds).toEqual(t)});it("set current video speed via cookie",function(){expect(e.speed).toEqual("0.75")})});describe("HTML5 API is available",function(){beforeEach(function(){e=new Video("#example")});afterEach(function(){e=null});it("create the Video Player",function(){expect(e.videoPlayer.player).not.toBeUndefined()})})})});describe("youtubeId",function(){beforeEach(function(){loadFixtures("video.html");$.cookie.andReturn("1.0");state=new Video("#example")});describe("with speed",function(){it("return the video id for given speed",function(){expect(state.youtubeId("0.75")).toEqual(this["7tqY6eQzVhE"]);expect(state.youtubeId("1.0")).toEqual(this.cogebirgzzM)})});describe("without speed",function(){it("return the video id for current speed",function(){expect(state.youtubeId()).toEqual(this.cogebirgzzM)})})});describe("setSpeed",function(){describe("YT",function(){beforeEach(function(){loadFixtures("video.html");state=new Video("#example")});describe("when new speed is available",function(){beforeEach(function(){state.setSpeed("0.75",!0)});it("set new speed",function(){expect(state.speed).toEqual("0.75")});it("save setting for new speed",function(){expect($.cookie).toHaveBeenCalledWith("video_speed","0.75",{expires:3650,path:"/"})})});describe("when new speed is not available",function(){beforeEach(function(){state.setSpeed("1.75")});it("set speed to 1.0x",function(){expect(state.speed).toEqual("1.0")})})});describe("HTML5",function(){beforeEach(function(){loadFixtures("video_html5.html");state=new Video("#example")});describe("when new speed is available",function(){beforeEach(function(){state.setSpeed("0.75",!0)});it("set new speed",function(){expect(state.speed).toEqual("0.75")});it("save setting for new speed",function(){expect($.cookie).toHaveBeenCalledWith("video_speed","0.75",{expires:3650,path:"/"})})});describe("when new speed is not available",function(){beforeEach(function(){state.setSpeed("1.75")});it("set speed to 1.0x",function(){expect(state.speed).toEqual("1.0")})})})});describe("getDuration",function(){beforeEach(function(){loadFixtures("video.html");state=new Video("#example")});it("return duration for current video",function(){expect(state.getDuration()).toEqual(200)})});describe("log",function(){beforeEach(function(){loadFixtures("video_html5.html");state=new Video("#example");spyOn(Logger,"log");state.videoPlayer.log("someEvent",{currentTime:25,speed:"1.0"})});it("call the logger with valid extra parameters",function(){expect(Logger.log).toHaveBeenCalledWith("someEvent",{id:"id",code:"html5",currentTime:25,speed:"1.0"})})})})}).call(this);