<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();

const error = ref('');
const successMessage = ref('');
const users = ref<any>();
const roles = ref<any>();

// afficher les utilisateurs connectés
const getAllUsers = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    console.log('token_user', token);
    const response = await clientHttp.get('http://localhost:8000/api/user/getAllUsers', {
      headers: {
        Authorization: 'Bearer ' + token!
      }
    });

    users.value = response.data.users;
    console.log("users", users.value);
  
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    successMessage.value = '';
    error.value = "Vous n'êtes pas connecté";
  }
};

const assignAdminRole = async (id: number) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    const userRoles = JSON.parse(localStorage.getItem("roles")!);
    
    if (userRoles.includes('admin')) {
    
      await clientHttp.post(`http://localhost:8000/api/roles/assignRoleAdmin/${id}`, null, {
        headers: {
          Authorization: 'Bearer ' + token!
        }
      });

      getAllUsers();
    } 
    else {
      
      console.error("Impossible d'éffectuer cette action, vous n'avez pas les autorisations.");
      
    }

  } catch (err) {
    console.error("Erreur lors de l'attribution du rôle d'administrateur", err);
    successMessage.value = '';
    error.value = "Erreur lors de l'attribution du rôle d'administrateur.";
  }
};

const removeRole = async (id: number) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    const userRoles = JSON.parse(localStorage.getItem("roles")!);
    
    if (userRoles.includes('admin')) {
    
      await clientHttp.delete(`http://localhost:8000/api/roles/removeRole/${id}`,  {
        headers: {
          Authorization: 'Bearer ' + token!
        }
      });

      getAllUsers();
    } 
    else {
      
      console.error("Impossible d'éffectuer cette action, vous n'avez pas les autorisations.");
      
    }

  } catch (err) {
    console.error("Erreur lors du retrait du rôle d'administrateur", err);
    successMessage.value = '';
    error.value = "Erreur lors du retrait du rôle d'administrateur.";
  }
};

onMounted(() => {
  getAllUsers();
});
</script>

<template>
  <div class="container mt-5">
    <h2>Liste des utilisateurs</h2>

    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Roles</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-for="user in users" >
        <tr>
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span v-for="role in user.roles" >{{ role.name }}</span>
          </td>
          <td>
            <button type="button" class="btn btn-info btn-sm" @click="assignAdminRole(user.id)">
            Nommez admin
            </button>
            <button type="button" class="btn btn-danger btn-sm" @click="removeRole(user.id)">
            Retirez le rôle
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
      </ul>
    </nav>
  </div>
</template>
