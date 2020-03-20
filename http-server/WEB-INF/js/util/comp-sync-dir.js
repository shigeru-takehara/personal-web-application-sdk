var jsonFile = 'syncDirs.json';

Vue.component('sync-dir', {
	mounted: function() {
		pwa.webUtil.addCloseAppListener();
		getOptions();
	},
	data: function () {
		return {
			syncDir1: function(event) {
				syncDirectory('dir1');
			},
			syncDir2: function(event) {
				syncDirectory('dir2');
			},
			syncDir3: function(event) {
				syncDirectory('dir3');
			},
			syncDir4: function(event) {
				syncDirectory('dir4');
			},
			syncDir5: function(event) {
				syncDirectory('dir5');
			},
			saveParams: function(event) {
				saveParams();
			}
		}
	},
	props: ['options'],
	template: `
		<div>
			<h1>Synchronize Directories</h1>
			<button class="button" v-on:click="saveParams" title="Save all parameters.">Save Params</button>
			<fieldset>
				<legend>Dir 1:</legend>
					<label>Name:</label>
					<input type="text" v-model="options.dir1.name" placeholder="Put the nickname here...">
					<div class="row">
						<div class="column">
							<label>Source Dir:</label>
							<input type="text" v-model="options.dir1.src" placeholder="c:\\dev\\mg\\78\\mom-jee\\project...">
							<button class="button" v-on:click="syncDir1" title="Clean up past log files.">Synchronize</button>
						</div>
						<div class="column">
							<label>Destination Dir:</label>
							<input type="text" v-model="options.dir1.dst" placeholder="c:\\dev\\mg\\78\\mom-jee\\deploy...">
						</div>
					</div>
			</fieldset>
			<fieldset>
				<legend>Dir 2:</legend>
					<label>Name:</label>
					<input type="text" v-model="options.dir2.name" placeholder="Put the nickname here...">
					<div class="row">
						<div class="column">
							<label>Source Dir:</label>
							<input type="text" v-model="options.dir2.src" placeholder="c:\\dev\\mg\\78\\mom-jee\\project...">
							<button class="button" v-on:click="syncDir2" title="Clean up past log files.">Synchronize</button>
						</div>
						<div class="column">
							<label>Destination Dir:</label>
							<input type="text" v-model="options.dir2.dst" placeholder="c:\\dev\\mg\\78\\mom-jee\\deploy...">
						</div>
					</div>
			</fieldset>
			<fieldset>
				<legend>Dir 3:</legend>
					<label>Name:</label>
					<input type="text" v-model="options.dir3.name" placeholder="Put the nickname here...">
					<div class="row">
						<div class="column">
							<label>Source Dir:</label>
							<input type="text" v-model="options.dir3.src" placeholder="c:\\dev\\mg\\78\\mom-jee\\project...">
							<button class="button" v-on:click="syncDir3" title="Clean up past log files.">Synchronize</button>
						</div>
						<div class="column">
							<label>Destination Dir:</label>
							<input type="text" v-model="options.dir3.dst" placeholder="c:\\dev\\mg\\78\\mom-jee\\deploy...">
						</div>
					</div>
			</fieldset>
			<fieldset>
				<legend>Dir 4:</legend>
					<label>Name:</label>
					<input type="text" v-model="options.dir4.name" placeholder="Put the nickname here...">
					<div class="row">
						<div class="column">
							<label>Source Dir:</label>
							<input type="text" v-model="options.dir4.src" placeholder="c:\\dev\\mg\\78\\mom-jee\\project...">
							<button class="button" v-on:click="syncDir4" title="Clean up past log files.">Synchronize</button>
						</div>
						<div class="column">
							<label>Destination Dir:</label>
							<input type="text" v-model="options.dir4.dst" placeholder="c:\\dev\\mg\\78\\mom-jee\\deploy...">
						</div>
					</div>
			</fieldset>
			<fieldset>
				<legend>Dir 5:</legend>
					<label>Name:</label>
					<input type="text" v-model="options.dir5.name" placeholder="Put the nickname here...">
					<div class="row">
						<div class="column">
							<label>Source Dir:</label>
							<input type="text" v-model="options.dir5.src" placeholder="c:\\dev\\mg\\78\\mom-jee\\project...">
							<button class="button" v-on:click="syncDir5" title="Clean up past log files.">Synchronize</button>
						</div>
						<div class="column">
							<label>Destination Dir:</label>
							<input type="text" v-model="options.dir5.dst" placeholder="c:\\dev\\mg\\78\\mom-jee\\deploy...">
						</div>
					</div>
			</fieldset>
		</div>
	`
});

var syncDir = new Vue({ 
	el: '#sync-dir',
	data: {
		options: {
			dir1:{src: '', dst: '', name: ''},
			dir2:{src: '', dst: '', name: ''},
			dir3:{src: '', dst: '', name: ''},
			dir4:{src: '', dst: '', name: ''},
			dir5:{src: '', dst: '', name: ''}
		}
	}
});

function getOptions() {
	axios
		.get(pwa.webUtil.URL + 'util/getData.jjs?MY-DATA/' + jsonFile)
		.then(response => {
			if (response.data) {
				syncDir.options = response.data;
			}
		});
}

function saveParams() {
	var data = JSON.stringify(syncDir.options);
	axios
		.get(pwa.webUtil.URL + 'util/saveData.jjs?MY-DATA/' + jsonFile + '&' + data)
		.catch(error => console.log(error));
}

function syncDirectory(obj) {
	axios
		.get(pwa.webUtil.URL + 'util/syncDir.jjs?' + syncDir.options[obj].src + '&' + syncDir.options[obj].dst);
}
