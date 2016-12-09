'use strict';

/* jshint maxlen: false */
/* jshint quotmark: false */
/* jshint newcap: false */

var _                    = require('lodash');
var mongoose             = require('mongoose');
var db                   = require('./');
var log                  = require('../util/logger').logger;
var User                 = mongoose.model('user');
var TermTemplate         = mongoose.model('termTemplate');
var ProvisionTemplate    = mongoose.model('provisionTemplate');
var DocumentTemplateType = mongoose.model('documentTemplateType');
var DocumentTemplate     = mongoose.model('documentTemplate');
var ProjectTemplate      = mongoose.model('projectTemplate');
var Project              = mongoose.model('project');
var ObjectId             = mongoose.Types.ObjectId;

function clearDb() {
  var ops = _(mongoose.models)
    .keys()
    .map(modelName => mongoose.model(modelName).remove())
    .value();

  return Promise.all(ops);
}

function insertUsers() {
  var users = [
    { "_id" : ObjectId("57fa20920cb5ff30ec857430"), "firstName" : "user1", "email" : "user1@mail.com", "hashedPassword" : "xKd3xarlKs8fn0iINhD5k0ex5hm4z3ctq1Q6tgsSV8Urogr/qAukddTmN9Pxjrsvfk4DQxAncSbKAFz/k/8GbA==", "salt" : "+zP2BiBaskkh9hXKzh5L5w==", "status" : "active", "invited" : false, "provider" : "local", "role" : "user" },
    { "_id" : ObjectId("57fa20920cb5ff30ec85742f"), "firstName" : "admin", "email" : "admin@mail.com", "hashedPassword" : "6nvd0F9sEW7yEvjeqT1XC2HO14Knw2Ow2OEJMKhCaSDjtnVftwFohGQ48PSVX5Tl8gFiX4J3HhCzuOkb+iS1Xg==", "salt" : "eTxOoNgYA4kBTQb0Z3JJKQ==", "status" : "active", "invited" : false, "provider" : "local", "role" : "admin" },
    { "_id" : ObjectId("57fa20920cb5ff30ec857431"), "firstName" : "user2", "email" : "user2@mail.com", "hashedPassword" : "Tp8ipKT2vyk3n+P3lzat5+HF62JAg2Uf/CkwQgUA2SV9Sn0unts1r/1WpXSxuWgsVOC3x7YdxQrGGDfh+n1HIg==", "salt" : "20tfkVec7bQymdcpecBLDg==", "status" : "active", "invited" : false, "provider" : "local", "role" : "user" }
  ];
  return User.create(users);
}

function insertTermTemplates() {
  var termtemplates = [
    { "_id" : ObjectId("57fa215761ef4235ec502a32"), "termType" : "text", "variable" : "text1", "displayName" : "text1", "help" : "<p>Text variable. Such variable is displayed as input element on properties editor and main text area.<br/></p>", "variant" : { "displayAs" : "dropdown", "default" : 0, "options" : [ ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }, "text" : { "placeholder" : "Text variable1" }},
    { "_id" : ObjectId("57fa21ab61ef4235ec502a34"), "termType" : "text", "variable" : "text2", "displayName" : "text2", "help" : "<p>Text variable. Such variable is displayed as input element on properties editor and main text area.<br/></p>", "variant" : { "displayAs" : "dropdown", "default" : 0, "options" : [ ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }, "text" : { "placeholder" : "Text variable2" }},
    { "_id" : ObjectId("57fa21dc61ef4235ec502a35"), "termType" : "boolean", "variable" : "bool1", "displayName" : "bool1", "help" : "", "variant" : { "displayAs" : "dropdown", "default" : 0, "options" : [ ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }},
    { "_id" : ObjectId("57fa21eb61ef4235ec502a36"), "termType" : "boolean", "variable" : "bool2", "displayName" : "bool2", "variant" : { "displayAs" : "dropdown", "default" : 0, "options" : [ ] }, "boolean" : { "default" : true, "exclusionText" : "Exclude text", "inclusionText" : "Include text" }},
    { "_id" : ObjectId("57fa221861ef4235ec502a37"), "termType" : "variant", "variable" : "variant1", "displayName" : "variant1", "variant" : { "default" : "opt3", "displayAs" : "dropdown", "options" : [ { "id" : 1, "value" : "opt1" }, { "id" : 2, "value" : "opt2" }, { "id" : 3, "value" : "opt3" } ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }},
    { "_id" : ObjectId("57fa223061ef4235ec502a38"), "termType" : "variant", "variable" : "variant2", "displayName" : "variant2", "variant" : { "default" : "option1", "displayAs" : "radio buttons", "options" : [ { "id" : 1, "value" : "option1" }, { "id" : 2, "value" : "option2" } ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }},
    { "_id" : ObjectId("57fa2310d0376b53ec44ede6"), "termType" : "date", "variable" : "date1", "displayName" : "date1", "variant" : { "displayAs" : "dropdown", "default" : 0, "options" : [ ] }, "boolean" : { "default" : false, "exclusionText" : "Exclude", "inclusionText" : "Include" }}
  ];
  return TermTemplate.create(termtemplates);
}

function insertProvisionTemplates() {
  var provisionTemplates = [
    { "_id" : ObjectId("57fa23fad0376b53ec44ede8"), "displayName" : "Simple logical expressions", "style" : "normal", "template" : "<p>The simple logical expression uses only one parameter. The nested content is displayed, when the variable value is <b>true</b>.<br/></p><ul><li>Bool expression (if bool1): {{#if bool1}}bool1 is true, and text1 is {{text1}}{{/if}}</li><li>Bool expression (if not bool1): {{#unless bool1}}bool1 is true{{/unless}}</li><li>Nested expression: {{#if bool1}}{{#if bool2}}bool1 and bool2 are true{{/if}}{{/if}}<br/></li></ul>", "tokensRoot" : "{\"type\":\"program\",\"tokens\":[{\"type\":\"content\",\"text\":\"<p>The simple logical expression uses only one parameter. The nested content is displayed, when the variable value is <b>true</b>.<br/></p><ul><li>Bool expression (if bool1): \"},{\"type\":\"statement\",\"text\":\"if\",\"params\":[{\"type\":\"variable\",\"text\":\"bool1\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is true, and text1 is \"},{\"type\":\"variable\",\"text\":\"text1\"}]},{\"type\":\"content\",\"text\":\"</li><li>Bool expression (if not bool1): \"},{\"type\":\"statement\",\"text\":\"unless\",\"params\":[{\"type\":\"variable\",\"text\":\"bool1\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is true\"}]},{\"type\":\"content\",\"text\":\"</li><li>Nested expression: \"},{\"type\":\"statement\",\"text\":\"if\",\"params\":[{\"type\":\"variable\",\"text\":\"bool1\"}],\"tokens\":[{\"type\":\"statement\",\"text\":\"if\",\"params\":[{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 and bool2 are true\"}]}]},{\"type\":\"content\",\"text\":\"<br/></li></ul>\"}]}", "templateHtml" : "<p>The simple logical expression uses only one parameter. The nested content is displayed, when the variable value is <b>true</b>.<br/></p><ul><li>Bool expression (if bool1): <span ng-class=\"{ invisible: !variables.bool1.value }\">bool1 is true, and text1 is \n<input type=\"text\"\n       ng-model=\"variables.text1.value\"\n       ng-blur=\"onChange()\"\n       placeholder=\"{{ variables.text1.text.placeholder }}\" /></span></li><li>Bool expression (if not bool1): <span ng-class=\"{ invisible: variables.bool1.value }\">bool1 is true</span></li><li>Nested expression: <span ng-class=\"{ invisible: !variables.bool1.value }\"><span ng-class=\"{ invisible: !variables.bool2.value }\">bool1 and bool2 are true</span></span><br/></li></ul>", "termTemplates" : [ ObjectId("57fa215761ef4235ec502a32"), ObjectId("57fa21dc61ef4235ec502a35"), ObjectId("57fa21eb61ef4235ec502a36") ] },
    { "_id" : ObjectId("57fa2473d0376b53ec44ede9"), "displayName" : "Complex logical expressions", "style" : "normal", "template" : "<p>The complex logical expression currently works with three parameters: operator (<b>and</b>, <b>or</b>, <b>and-not, not-and</b>, <b>not-and-not</b>, <b>or-not, not-or, not-or-not</b>) and two variables. The parameters order is important. The nested content is displayed when the result of the expression is <b>true</b>. <b>ifCond</b>' statement can be extended, not it supports only expressions with two variables, but it can be extended to support such expressions as <b>and (or-not)</b>, <b>v1 and (v2 or not v3)</b>, for example.<br/></p><ul><li>Bool expression (if bool1 and bool2): {{#ifCond 'and' bool1 bool2}}bool1 and bool2 are true{{/ifCond}}​</li><li>Bool expression (if not bool1 and bool2): {{#ifCond 'not-and' bool1 bool2}}bool1 is false and bool2 is true{{/ifCond}}​</li><li>Bool expression (if bool1 and not bool2): {{#ifCond 'and-not' bool1 bool2}}bool1 is true and bool2 is false{{/ifCond}}​</li><li>Bool expression (if not bool1 and not bool2): {{#ifCond 'not-and-not' bool1 bool2}}bool1 is false and bool2 is false{{/ifCond}}​</li><li>Bool expression (if bool1 or bool2): {{#ifCond 'or' bool1 bool2}}bool1 or bool2 is true{{/ifCond}}</li><li>Bool expression (if not bool1 or bool2): {{#ifCond 'not-or' bool1 bool2}}bool1 is false or bool2 is true{{/ifCond}}</li><li>Bool expression (if bool1 or not bool2): {{#ifCond 'or-not' bool1 bool2}}bool1 is true or bool2 is false{{/ifCond}}</li><li>Bool expression (if not bool1 or not bool2): {{#ifCond 'not-or-not' bool1 bool2}}bool1 is false or bool2 is false{{/ifCond}}<br/></li></ul>", "tokensRoot" : "{\"type\":\"program\",\"tokens\":[{\"type\":\"content\",\"text\":\"<p>The complex logical expression currently works with three parameters: operator (<b>and</b>, <b>or</b>, <b>and-not, not-and</b>, <b>not-and-not</b>, <b>or-not, not-or, not-or-not</b>) and two variables. The parameters order is important. The nested content is displayed when the result of the expression is <b>true</b>. <b>ifCond</b>' statement can be extended, not it supports only expressions with two variables, but it can be extended to support such expressions as <b>and (or-not)</b>, <b>v1 and (v2 or not v3)</b>, for example.<br/></p><ul><li>Bool expression (if bool1 and bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"and\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 and bool2 are true\"}]},{\"type\":\"content\",\"text\":\"​</li><li>Bool expression (if not bool1 and bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"not-and\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is false and bool2 is true\"}]},{\"type\":\"content\",\"text\":\"​</li><li>Bool expression (if bool1 and not bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"and-not\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is true and bool2 is false\"}]},{\"type\":\"content\",\"text\":\"​</li><li>Bool expression (if not bool1 and not bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"not-and-not\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is false and bool2 is false\"}]},{\"type\":\"content\",\"text\":\"​</li><li>Bool expression (if bool1 or bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"or\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 or bool2 is true\"}]},{\"type\":\"content\",\"text\":\"</li><li>Bool expression (if not bool1 or bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"not-or\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is false or bool2 is true\"}]},{\"type\":\"content\",\"text\":\"</li><li>Bool expression (if bool1 or not bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"or-not\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is true or bool2 is false\"}]},{\"type\":\"content\",\"text\":\"</li><li>Bool expression (if not bool1 or not bool2): \"},{\"type\":\"statement\",\"text\":\"ifCond\",\"params\":[{\"type\":\"operator\",\"text\":\"not-or-not\"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"variable\",\"text\":\"bool2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"bool1 is false or bool2 is false\"}]},{\"type\":\"content\",\"text\":\"<br/></li></ul>\"}]}", "templateHtml" : "<p>The complex logical expression currently works with three parameters: operator (<b>and</b>, <b>or</b>, <b>and-not, not-and</b>, <b>not-and-not</b>, <b>or-not, not-or, not-or-not</b>) and two variables. The parameters order is important. The nested content is displayed when the result of the expression is <b>true</b>. <b>ifCond</b>' statement can be extended, not it supports only expressions with two variables, but it can be extended to support such expressions as <b>and (or-not)</b>, <b>v1 and (v2 or not v3)</b>, for example.<br/></p><ul><li>Bool expression (if bool1 and bool2): <span ng-class=\"{ invisible: !$root.ifCond('and', variables.bool1.value, variables.bool2.value) }\">bool1 and bool2 are true</span>​</li><li>Bool expression (if not bool1 and bool2): <span ng-class=\"{ invisible: !$root.ifCond('not-and', variables.bool1.value, variables.bool2.value) }\">bool1 is false and bool2 is true</span>​</li><li>Bool expression (if bool1 and not bool2): <span ng-class=\"{ invisible: !$root.ifCond('and-not', variables.bool1.value, variables.bool2.value) }\">bool1 is true and bool2 is false</span>​</li><li>Bool expression (if not bool1 and not bool2): <span ng-class=\"{ invisible: !$root.ifCond('not-and-not', variables.bool1.value, variables.bool2.value) }\">bool1 is false and bool2 is false</span>​</li><li>Bool expression (if bool1 or bool2): <span ng-class=\"{ invisible: !$root.ifCond('or', variables.bool1.value, variables.bool2.value) }\">bool1 or bool2 is true</span></li><li>Bool expression (if not bool1 or bool2): <span ng-class=\"{ invisible: !$root.ifCond('not-or', variables.bool1.value, variables.bool2.value) }\">bool1 is false or bool2 is true</span></li><li>Bool expression (if bool1 or not bool2): <span ng-class=\"{ invisible: !$root.ifCond('or-not', variables.bool1.value, variables.bool2.value) }\">bool1 is true or bool2 is false</span></li><li>Bool expression (if not bool1 or not bool2): <span ng-class=\"{ invisible: !$root.ifCond('not-or-not', variables.bool1.value, variables.bool2.value) }\">bool1 is false or bool2 is false</span><br/></li></ul>", "termTemplates" : [ ObjectId("57fa21dc61ef4235ec502a35"), ObjectId("57fa21eb61ef4235ec502a36") ] },
    { "_id" : ObjectId("57fa237cd0376b53ec44ede7"), "displayName" : "Variables", "style" : "normal", "template" : "<p>Each variable can be inserted in a template outside of expression. In this case this variable is rendered as an editor according variable type:</p><ul><li>Text: input element.</li><li>Bool: radio buttons.</li><li>Variant<b>: </b>dropdown or radio buttons with options.</li><li>Date: date picker element.</li></ul><h4>Examples:</h4><ul><li>Text: {{ text1 }}​</li><li>Bool: {{ bool1 }}</li><li>Variant: {{ variant1 }}</li><li>Date: {{ date1 }}<br/></li></ul>", "tokensRoot" : "{\"type\":\"program\",\"tokens\":[{\"type\":\"content\",\"text\":\"<p>Each variable can be inserted in a template outside of expression. In this case this variable is rendered as an editor according variable type:</p><ul><li>Text: input element.</li><li>Bool: radio buttons.</li><li>Variant<b>: </b>dropdown or radio buttons with options.</li><li>Date: date picker element.</li></ul><h4>Examples:</h4><ul><li>Text: \"},{\"type\":\"variable\",\"text\":\"text1\"},{\"type\":\"content\",\"text\":\"​</li><li>Bool: \"},{\"type\":\"variable\",\"text\":\"bool1\"},{\"type\":\"content\",\"text\":\"</li><li>Variant: \"},{\"type\":\"variable\",\"text\":\"variant1\"},{\"type\":\"content\",\"text\":\"</li><li>Date: \"},{\"type\":\"variable\",\"text\":\"date1\"},{\"type\":\"content\",\"text\":\"<br/></li></ul>\"}]}", "templateHtml" : "<p>Each variable can be inserted in a template outside of expression. In this case this variable is rendered as an editor according variable type:</p><ul><li>Text: input element.</li><li>Bool: radio buttons.</li><li>Variant<b>: </b>dropdown or radio buttons with options.</li><li>Date: date picker element.</li></ul><h4>Examples:</h4><ul><li>Text: \n<input type=\"text\"\n       ng-model=\"variables.text1.value\"\n       ng-blur=\"onChange()\"\n       placeholder=\"{{ variables.text1.text.placeholder }}\" />​</li><li>Bool: \n<span>\n  <label>\n    <input type=\"radio\" ng-model=\"variables.bool1.value\" ng-value=\"true\" ng-change=\"onChange()\" />\n    <span>{{ ::variables.bool1.boolean.inclusionText }}</span>\n  </label>\n   <label>\n    <input type=\"radio\" ng-model=\"variables.bool1.value\" ng-value=\"false\" ng-change=\"onChange()\" />\n    <span>{{ ::variables.bool1.boolean.exclusionText }}</span>\n  </label>\n</span></li><li>Variant: \n<select ng-model=\"variables.variant1.value\"\n        ng-options=\"opt.value as opt.value for opt in variables.variant1.variant.options\"\n        ng-change=\"onChange()\">\n</select></li><li>Date: \n<input type=\"text\"\n       ng-model=\"variables.date1.value\"\n       ng-click=\"variables.date1.isOpened1 = true\"\n       ng-required=\"true\"\n       ng-change=\"onChange()\"\n       uib-datepicker-popup=\"MMMM d, yyyy\"\n       is-open=\"variables.date1.isOpened1\"\n       datepicker-options=\"dateOptions\"\n       close-text=\"Close\"\n       datepicker-append-to-body=\"true\" /><br/></li></ul>", "termTemplates" : [ ObjectId("57fa215761ef4235ec502a32"), ObjectId("57fa21dc61ef4235ec502a35"), ObjectId("57fa221861ef4235ec502a37"), ObjectId("57fa2310d0376b53ec44ede6") ] },
    { "_id" : ObjectId("57fa28088eb789a5ec49d3d5"), "displayName" : "Logical expressions with varian type", "style" : "normal", "template" : "<p>The expressions with variant type are logical expressions. The nested content is displayed when the variable value equals selected option.</p><ul><li>Variant expression (if variant1 === 'opt1'): {{#ifVariant variant1 'opt1'}}variant1 equals opt1{{/ifVariant}}</li><li>Variant expression (if variant2 === 'option2'): {{#ifVariant variant2 'option2'}}variant2 equals option2{{/ifVariant}}</li></ul>", "tokensRoot" : "{\"type\":\"program\",\"tokens\":[{\"type\":\"content\",\"text\":\"<p>The expressions with variant type are logical expressions. The nested content is displayed when the variable value equals selected option.</p><ul><li>Variant expression (if variant1 === 'option1'): \"},{\"type\":\"statement\",\"text\":\"ifVariant\",\"params\":[{\"type\":\"variable\",\"text\":\"variant1\"},{\"type\":\"operator\",\"text\":\"option1\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"variant1 equals option1\"}]},{\"type\":\"content\",\"text\":\"</li><li>Variant expression (if variant2 === 'option2'): \"},{\"type\":\"statement\",\"text\":\"ifVariant\",\"params\":[{\"type\":\"variable\",\"text\":\"variant2\"},{\"type\":\"operator\",\"text\":\"option2\"}],\"tokens\":[{\"type\":\"content\",\"text\":\"variant2 equals option2\"}]},{\"type\":\"content\",\"text\":\"</li></ul>\"}]}", "templateHtml" : "<p>The expressions with variant type are logical expressions. The nested content is displayed when the variable value equals selected option.</p><ul><li>Variant expression (if variant1 === 'opt1'): <span ng-class=\"{ invisible: !$root.ifVariant(variables.variant1.value, 'opt1') }\">variant1 equals opt1</span></li><li>Variant expression (if variant2 === 'option2'): <span ng-class=\"{ invisible: !$root.ifVariant(variables.variant2.value, 'option2') }\">variant2 equals option2</span></li></ul>", "termTemplates" : [ ObjectId("57fa221861ef4235ec502a37"), ObjectId("57fa223061ef4235ec502a38") ] }
  ];
  return ProvisionTemplate.create(provisionTemplates);
}

function insertDocumentTemplateTypes() {
  var documentTemplateTypes = [
    { "_id" : ObjectId("57fa4b5315d084efeef2ba57"), "name" : "example template type" }
  ];
  return DocumentTemplateType.create(documentTemplateTypes);
}

function insertDocumentTemplates() {
  var documentTemplates = [
    { "_id" : ObjectId("57fa4b8215d084efeef2ba58"), "name" : "Variables", "documentType" : ObjectId("57fa4b5315d084efeef2ba57"), "provisionTemplates" : [ ObjectId("57fa237cd0376b53ec44ede7") ] },
    { "_id" : ObjectId("57faa04c8b473d77f4d4be1a"), "name" : "Simple logical expressions", "documentType" : ObjectId("57fa4b5315d084efeef2ba57"), "provisionTemplates" : [ ObjectId("57fa23fad0376b53ec44ede8") ] },
    { "_id" : ObjectId("57faa17b11a377a8f437cd74"), "name" : "Complex logical expressions", "documentType" : ObjectId("57fa4b5315d084efeef2ba57"), "provisionTemplates" : [ ObjectId("57fa2473d0376b53ec44ede9") ] },
    { "_id" : ObjectId("57faa1b011a377a8f437cd75"), "name" : "Logical expressions with varian type", "documentType" : ObjectId("57fa4b5315d084efeef2ba57"), "provisionTemplates" : [ ObjectId("57fa28088eb789a5ec49d3d5") ] }
  ];
  return DocumentTemplate.create(documentTemplates);
}

function insertProjectTemplates() {
  var projectTemplates = [
    { "_id" : ObjectId("57fa4b9d15d084efeef2ba59"), "name" : "examples", "documentTemplates" : [ ObjectId("57fa4b8215d084efeef2ba58"), ObjectId("57faa04c8b473d77f4d4be1a"), ObjectId("57faa17b11a377a8f437cd74"), ObjectId("57faa1b011a377a8f437cd75") ] }
  ];
  return ProjectTemplate.create(projectTemplates);
}

function insertProjects() {
  var projects = [
    { "_id" : ObjectId("57fa4bab15d084efeef2ba5a"), "name" : "examples", "projectTemplate" : ObjectId("57fa4b9d15d084efeef2ba59"), "values" : [ { "variable" : "text1", "value" : "text12345" }, { "variable" : "bool1", "value" : "true" }, { "variable" : "variant1", "value" : "opt1" }, { "variable" : "date1", "value" : "2016-10-04T21:00:00.000Z" }, { "variable" : "variant2", "value" : "option2" }, { "variable" : "bool2", "value" : "true" } ] }
  ];
  return Project.create(projects);
}

db
  .connect()
  .then(clearDb)
  .then(insertUsers)
  .then(insertTermTemplates)
  .then(insertProvisionTemplates)
  .then(insertDocumentTemplateTypes)
  .then(insertDocumentTemplates)
  .then(insertProjectTemplates)
  .then(insertProjects)
  .then(() => log.info('All scripts applied succesfully'))
  .catch(err => log.error('The scripts are not applied', err))
  .finally(db.disconnect);
