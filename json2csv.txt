
function json2csv(content){
  var fields = getFields(content);
  return new Parser({ fields }).parse(content);

  function getFields(content){
      var fields = [];
      for(var i = 0; i < content.length; i++){
        fields = Object.keys(content[i]);
        if(fields.length > 0)
        break;
      };
      return fields;
    }
  }
