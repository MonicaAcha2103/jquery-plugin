      var jsonUrl;
      (function($) {
        $.fn.owntable = function(Url) {
          jsonUrl = Url;
          $.getJSON(Url, function(data) {
            //console.log(data);
            build(data);


          })

        }
      }(jQuery));

      //to sort in descending order
      $(".desc").click(function() {
        var content = $(this).parent().parent().prev().attr('id');

        $.getJSON(jsonUrl, function(data) {
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          if (content == "b1") {
            data.sort(function(x, y) {
              return x.Book_ID < y.Book_ID;
            });
          } else if (content == "b2") {
            data.sort(function(x, y) {
              return x.Book_Name < y.Book_Name;
            });
          } else if (content == "b3") {
            data.sort(function(x, y) {
              return x.Book_Category < y.Book_Category;
            });
          } else {
            data.sort(function(x, y) {
              return x.Book_Price < y.Book_Price;
            });
          }

          $(".Row").replaceWith(build(data));

        })

      });

      //to sort in ascending order
      $(".asc").click(function() {
        var content = $(this).parent().parent().prev().attr('id');

        $.getJSON(jsonUrl, function(data) {
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          if (content == "b1") {
            data.sort(function(x, y) {
              return x.Book_ID > y.Book_ID;
            });
          } else if (content == "b2") {
            data.sort(function(x, y) {
              return x.Book_Name > y.Book_Name;
            });
          } else if (content == "b3") {
            data.sort(function(x, y) {
              return x.Book_Category > y.Book_Category;
            });
          } else {
            data.sort(function(x, y) {
              return x.Book_Price > y.Book_Price;
            });
          }

          $(".Row").replaceWith(build(data));


        })
      });
      // to implement search functionality
      $(".textclass").on("keyup", function() {
        $(".Row").empty();

        var content = $(this).parent().parent().parent().prev().attr('id');
        $.getJSON(jsonUrl, function(data) {
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          var arr = [];
          $.each(data, function(idx, obj) {

            if (content == "b1") {
              if (obj.Book_ID.toLowerCase().indexOf(($('#text1').val().toLowerCase())) != -1)

                arr.push(obj);

              console.log(arr);

            } else if (content == "b2") {
              if (obj.Book_Name.toLowerCase().indexOf(($('#text2').val().toLowerCase())) != -1)
                arr.push(obj);
            } else if (content == "b3") {
              if (obj.Book_Category.toLowerCase().indexOf(($('#text3').val().toLowerCase())) != -1)
                arr.push(obj);
            } else {
              if (obj.Book_Price.toLowerCase().indexOf(($('#text4').val().toLowerCase())) != -1)
                arr.push(obj);
            }

            $(".Row").empty();
            build(arr);
          });

        });

      });

      //to create dom
      function build(data) {
        for (var i = 0; i < data.length; i++) {


          var contents = document.getElementById("mytable");
          //var contents = $('#mytable');
          var row = $(document.createElement('div')).addClass("Row");

          var cellId = $(document.createElement("div")).addClass("Cell1");
          var cellName = $(document.createElement("div")).addClass("Cell2");
          var cellCategory = $(document.createElement("div")).addClass("Cell3");
          var cellPrice = $(document.createElement("div")).addClass("Cell4");

          var tableDataId = $(document.createElement("p")).text(data[i].Book_ID);
          var tableDataName = $(document.createElement("p")).text(data[i].Book_Name);
          var tableDataCategory = $(document.createElement("p")).text(data[i].Book_Category);
          var tableDataPrice = $(document.createElement("p")).text(data[i].Book_Price);
          //console.log(data.length);

          $(cellId).append(tableDataId);
          $(cellName).append(tableDataName);
          $(cellCategory).append(tableDataCategory);
          $(cellPrice).append(tableDataPrice);

          $(row).append(cellId);
          $(row).append(cellName);
          $(row).append(cellCategory);
          $(row).append(cellPrice);

          $('#mytable').append(row)
        }


        var Unique1 = $.unique(data.map(function(d) {
          return d.Book_ID;
        }));
        var Unique2 = $.unique(data.map(function(d) {
          return d.Book_Name;
        }));
        var Unique3 = $.unique(data.map(function(d) {
          return d.Book_Category;
        }));
        var Unique4 = $.unique(data.map(function(d) {
          return d.Book_Price;
        }));

        $("#show1").empty();
        $("#show2").empty();
        $("#show3").empty();
        $("#show4").empty();

        $.each(Unique1, function(index, value) {
          $("#show1").append('<input type="checkbox" class="check1" value="' + value + '"id="' + value

            +
            '"/> ' + value + '<br />');
        });

        $.each(Unique2, function(index, value) {

          $("#show2").append('<input type="checkbox" class="check2" value="' + value + '"id="' + value + '"/> ' + value + '<br />');
        });
        $.each(Unique3, function(index, value) {
          $("#show3").append('<input type="checkbox" class="check3" value="' + value + '"id="' + value + '"/> ' + value + '<br />');
        });
        $.each(Unique4, function(index, value) {
          $("#show4").append('<input type="checkbox" class="check4" value="' + value + '"id="' + value + '"/> ' + value + '<br />');
        });


        //checkfunction();
      }

      $('.checklist1').change(function() {
        $('.check1').each(function(index) {
          var isChecked = $(this).is(':checked');

          if (isChecked) {

            var x = $(this).attr('id');

            check1(x);

          }

        });
      });

      function check1(value) {
        $.getJSON(jsonUrl, function(data) {
          var arr = [];
          $(".Row").empty();
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          $.each(data, function(idx, obj) {
            if (obj.Book_ID.toLowerCase().indexOf((value.toLowerCase())) != -1)
              arr.push(obj);
          });

          build(arr);
        });
      }
      $('.checklist2').change(function() {
        $('.check2').each(function(index) {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            var x = $(this).attr('id');
            check2(x);
          }

        });
      });

      function check2(value) {
        $.getJSON(jsonUrl, function(data) {
          var arr = [];
          $(".Row").empty();
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          $.each(data, function(idx, obj) {
            if (obj.Book_Name.toLowerCase().indexOf((value.toLowerCase())) != -1)
              arr.push(obj);
          });

          build(arr);
        });
      }
      $('.checklist3').change(function() {
        $('.check3').each(function(index) {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            var x = $(this).attr('id');
            check3(x);
          }

        });
      });

      function check3(value) {
        $.getJSON(jsonUrl, function(data) {
          var arr = [];
          $(".Row").empty();
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          $.each(data, function(idx, obj) {
            if (obj.Book_Category.toLowerCase().indexOf((value.toLowerCase())) != -1)
              arr.push(obj);
          });

          build(arr);
        });
      }
      $('.checklist4').change(function() {
        $('.check4').each(function(index) {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            var x = $(this).attr('id');
            check4(x);
          }

        });
      });

      function check4(value) {
        $.getJSON(jsonUrl, function(data) {
          var arr = [];
          $(".Row").empty();
          $("#show1").empty();
          $("#show2").empty();
          $("#show3").empty();
          $("#show4").empty();
          $.each(data, function(idx, obj) {
            if (obj.Book_Price.toLowerCase().indexOf((value.toLowerCase())) != -1)
              arr.push(obj);
          });

          build(arr);
        });
      }
