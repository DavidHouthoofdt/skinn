/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var build = './src/ViewBundle/Resources/js/build/';
var app = './src/ViewBundle/Resources/js/app/';
var publish = './src/ViewBundle/Resources/js';
var util = require('gulp-util');



module.exports = {

  isDev : function()
  {
    return (!!util.env.dev);
  },

  getBuildFolder: function() {
    return build;
  },

  getAppFolder: function() {
    return app;
  },

  getPublishFolder: function() {
    return publish;
  },

  getUglifySettings: function()
  {
    return {
        toplevel: true,

        output: {
            beautify: false,
            preamble: "/* uglified */"
        }
    };
  }
}