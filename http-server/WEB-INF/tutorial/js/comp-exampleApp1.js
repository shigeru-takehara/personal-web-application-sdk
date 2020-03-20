var tempFilePrefix = "exampleApp1";

Vue.component('example-app1', {
	mounted: function() {
		pwa.webUtil.addCloseAppListener();
	},
	data: function () {
		return {
			runApp1: function(event) {
				runApp();
			}
		}
	},
	props: ['options','buttondisabled','status'],
	template: `
		<div>
			<fieldset>
				<legend>App 1:</legend>
					<input type="radio" value="1" v-model="options.method">First Implementation<br>
					<input type="radio" value="2" v-model="options.method">Second Implementation<br>
					<input type="radio" value="3" v-model="options.method">Third Implementation<br>
					<div>
						<button class="button" :disabled='buttondisabled' v-on:click="runApp1" title="Run App1">Run</button>
					</div>
				<textarea id="textAreaStatus" readonly v-model="status" placeholder="Processing Status" rows="16"></textarea>
			</fieldset>
		</div>
	`
});

var exampleApp1 = new Vue({ 
	el: '#example-app1',
	data: {
		options: {method: '1'},
		buttondisabled: false,
		status: ""
	}
});


function runApp() {
	exampleApp1.status = "";
	axios
		.get(pwa.webUtil.URL + 'tutorial/runApp.jjs?' + tempFilePrefix + '&' + exampleApp1.options.method);
	exampleApp1.buttondisabled = true;
	getStatusLog(5); // check every 5 sec
}

function getStatusLog(duration) {
	var intervalId = setInterval(function() {
		axios
			.get(pwa.webUtil.URL + 'util/getStatusLog.jjs?' + tempFilePrefix)
			.then(response => {
				exampleApp1.status = response.data;
				if (exampleApp1.status.indexOf("Overall Lasted") > 0) {
					exampleApp1.buttondisabled = false;
					clearInterval(intervalId);
				}
			})
			.catch(error => console.log(error));
	}, 1000 * duration);
}
