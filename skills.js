'use strict';

function ascend(state,x,y){
	if(state=="true"){
		return x>y;
	}else{
		return y>x;
	}
}

function sortAlphabetically(collum){
	//the function is just coppied from w3schools.
	
	//this part is just for ascending/dis.
	if(document.getElementById("button-"+collum).value=="false"){
		document.getElementById("button-"+collum).value = "true";
	}else{
		document.getElementById("button-"+collum).value = "false";
	}
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("table");
	switching = true;
	
	while (switching) {
		switching = false;
		rows = table.rows;
		
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[collum];
			y = rows[i + 1].getElementsByTagName("TD")[collum];
			if (ascend(document.getElementById("button-"+collum).value,x.innerHTML.toLowerCase(),y.innerHTML.toLowerCase())) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function sortCollum(collum){
	if(collum==0){
		sortAlphabetically(0);
	}else{
		var fewRows = document.getElementsByClassName("table-row-"+collum);
		var table = document.getElementById("table");
		var allRows = table.rows;
		
		var counter =0;
	
		while(counter<fewRows.length){
			var x = fewRows[counter];
			var y = allRows[counter+1];
			
			if(y.className!=x.className){
				y.parentNode.insertBefore(x, y);
			}
			counter++;
		}
	}
}

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  
  xhttp.open("GET", "skills.txt", true);
  
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
	
	titleData.push("Skills");//to create empty cell at <th> so skills go under it

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
			if(counter<6){//insert depending on how many ratings you devide each skill 
				titleData.push(word);
			}else if(counter%2==0){//CHANGE to 0 if your ratings are even at number
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
		titles.innerHTML += "<th><button value='false' id='button-"+j+"' class='tableButton' onClick='buttonsOnlick("+j+")'>"+titleData[j]+"</button></th>";
	}

	//then create the <tr> and the first <td> - the skill
	for(var k=0;k<Object.keys(skillData).length;k++){

		skills.innerHTML += "<tr id='table-row-"+k+"'></tr>";
		var skill = document.getElementById("table-row-"+k);
		skill.innerHTML+= "<td id='"+skillData[k]+"Skill' class='skillName'>"+skillData[k]+"</td>";
		
		//then depending on the rating add empty <td> until you finaly play TICK at rating
		var v;
		for(v=1;v<ratingData[k];v++){
			skill.innerHTML+= "<td></td>";
		}
		skill.innerHTML+= "<td class='tick-"+v+"'>TICK</td>";
		skill.setAttribute("class", "table-row-"+v);
	}	
  }
  
  xhttp.send();
}

loadDoc();




















