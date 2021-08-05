'use strict';

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  
  xhttp.open("GET", "skills.txt", true);
  xhttp.send();
  
  xhttp.onload = function() {
    var data = this.responseText;
	
	//data refers to a single string that is .txt
	
	//titleData refers to <th> strings to be inserted into innerHtml
	
	//skillData refers to <tr> strings to be inserted into innerHtml of tableBody
	//+ the first element as <td>
	
	//ratingData refers to empty <td> after the first
	var titleData = [];
	var skillData = [];
	var ratingData = [];
	
	var word = "";
	var counter =0;
	var i = 0;
	
	titleData.push(word);//to create empty cell at <th> so skills go under it

	/*
	*The below loop aims to recognise the words from the data and categorize
	*it in each respective array so we can manipulate it later
	*
	*THIS JOB IS DONE INSIDE THIS FUNCTION BECAUSE the only way to extract proper txt
	*is at this level.For further manipulation of the table you need new code of the 
	* "new" html(after the function).
	*/

	while(word!="EOF"){//.txt needs EOF so it can terminate the parse
		if(data[i]==","){//.txt must be like CSV
			if(counter<5){//insert depending on how many rates you devide each skill 
				titleData.push(word);
			}else if(counter%2==1){//CHANGE to 0 if your ratings are even at number
				skillData.push(word);
			}else{
				ratingData.push(word);
			}
			word="";
			counter++;
		}
		if(data[i]!=","){
			word += data[i];	
		}
		i++;
	}
	
	var titles = document.getElementById("rowTitles");
	var skills = document.getElementById("tableBody");
	
	//first insert the titles of the ratings
	for(var j=0;j<Object.keys(titleData).length;j++){
		titles.innerHTML += "<th>"+titleData[j]+"</th>";
	}

	//then create the <tr> and the first <td> - the skill
	for(var k=0;k<Object.keys(skillData).length;k++){

		skills.innerHTML += "<tr id="+skillData[k]+"></tr>";
		var skill = document.getElementById(skillData[k]);
		skill.innerHTML+= "<td>"+skillData[k]+"</td>";
		
		//then depending on the rating add empty <td> until you finaly play TICK at rating
		//position and give <td> its value.
		for(var v=0;v<ratingData[k]-1;v++){
			skill.innerHTML+= "<td></td>";
		}
		skill.innerHTML+= "<td value="+ratingData[k]+">TICK</td>";
	}
	
  }
}

loadDoc();
	



























