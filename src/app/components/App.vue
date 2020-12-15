<template>
	<div>
		<nav class="navbar navbar-light bg-light">
			<a href="/" class="navbar–brand"> MEVN Stack</a>
		</nav>

		<div class="container"></div>
			<div class="row p-5 ">
				<div class="col-md-5">
					<div class="card">
						<div class="card-body">
							<form @submit.prevent="sendTask">
								<div class="form-group">
									<input type="text" v-model="task.title" placeholder="Insert a Task" class="form-control">
								</div>
								<div class="form-group">
									<textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Insert Description"></textarea>
								</div>
								<!-- <div class="d-grid gap-2 p-1">
									<button class="btn btn-primary">Send</button>
								</div> -->
								<template v-if = "edit=== false">
									<div class="d-grid gap-2 p-1">
										<button class="btn btn-primary">Send</button>
									</div>
								</template>
								<template v-else >
									<div class="d-grid gap-2 p-1">
										<button class="btn btn-secundary">Update</button>
									</div>
								</template>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-7">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Task</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="task of tasks">
								<td>{{task.title}}</td>
								<td>{{task.description}}</td>
								<button  @click="deleteTask(task._id)" class="btn btn-outline-danger">Delete</button>
								<button @click="editTask(task._id)" class="btn btn-outline-success">Edit</button>
							</tr>
							


						</tbody>
					</table>
				</div>
			</div>		
		</div>
</template>

<script>
	// class Task{
	// 	constructor(title,description){
	// 		this.title=title;
	// 		this.description=description;			
	// 	}				
	// }
	

	export default {
		data(){
			return {
				//task: new Task()
				task:{
					title:'',
					description:''
				},
				tasks: [],
				edit: false,
				taskToEdit: ''
			}	
		},
		created() {    //this execute in the first run
			this.getTasks();
		}
		,
		methods :{
			sendTask(){
				if (this.edit === false){
					//console.log(this.task);
					//this.task = new Task();
					fetch('/api/task',{
						method: 'POST',
						body: JSON.stringify(this.task),
						headers: {
							'Accept':'application/json',
							'content-type':'application/json'
						}
					})
					// .then(res => console.log(res))
					.then(res => res.json())
					//.then(res => console.log(res))
					.then(data => {
						this.getTasks();
					})
				} else {
					fetch('/api/task/'+this.taskToEdit ,{
						method: 'PUT',
						body: JSON.stringify(this.task),
						headers: {
							'Accept':'application/json',
							'content-type':'application/json'
							}
						})
						.then(res => res.json())
						.then(res => {
							this.getTasks();
							this.edit = false;
						})
						
				}

				this.task.title = '';
				this.task.description='';			
			},
			getTasks(){
				fetch('/api/task')
					.then(res => res.json())
					//.then(data => console.log(data));
					.then(data => {
						this.tasks=data;
						console.log(this.tasks);
					})
			},
			deleteTask(id){
				fetch('/api/task/' + id,{
					method: 'DELETE',
					headers:{
						'Accept':'application/json',
						'content-type':'application/json'
					}
				})
				.then(res => res.json())
				//.then(data => console.log(data))
				.then(data =>{
					this.getTasks()
				})
			},
			editTask(id){
				//console.log("editing "+ id);
				fetch('/api/task/'+id)
					.then(res => res.json())
					//.then(data => console.log(data))
					.then(data =>{
						this.task.title=data.title;
						this.task.description=data.description;
						this.taskToEdit = data._id;
						this.edit = true;
					})
			}
		}
	}
</script>