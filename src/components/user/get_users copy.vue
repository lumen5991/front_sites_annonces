<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import clientHttp from "@/libs/clientHttp";

const error = ref('');
const successMessage = ref('');
const isLoading = ref(true);
const users = ref<any[]>([]);
const pageSize = 3;
const currentPage = ref(1);

const showDeleteModal = ref(false);
const selectedElement = ref();

const showAssignAdminModal = ref(false);
const showRemoveAdminModal = ref(false);

const disabled = ref(false);




const getAllUsers = async () => {
  isLoading.value = true;

  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    const response = await clientHttp.get('http://localhost:8000/api/user/getAllUsers', {
      headers: {
        Authorization: 'Bearer ' + token!
      }
    });
    users.value = response.data.users;
    console.log('roles', response.data.users);



  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    error.value = "Erreur lors de la récupération des utilisateurs";
  } finally {
    isLoading.value = false;
  }
};


//attribuer le rôle d'administrateur
const assignAdminRole = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    const userRoles = JSON.parse(localStorage.getItem("roles")!);

    if (userRoles.includes('admin')) {

      await clientHttp.post(`http://localhost:8000/api/roles/assignRoleAdmin/${selectedElement.value}`, null, {
        headers: {
          Authorization: 'Bearer ' + token!
        }
      });
      getAllUsers();
      closeModalAssignRole()
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

// retirer le rôle d'administrateur
const removeRole = async (id: number) => {

  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    const userRoles = JSON.parse(localStorage.getItem("roles")!);

    if (userRoles.includes('admin')) {

      await clientHttp.delete(`http://localhost:8000/api/roles/removeRole/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token!
        }
      });

      closeModalRemoveRole();

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

const closeModalAssignRole = () => {
  selectedElement.value = null;
  showAssignAdminModal.value = !showAssignAdminModal.value
}

const closeModalRemoveRole = () => {
  selectedElement.value = null;
  showRemoveAdminModal.value = !showRemoveAdminModal.value
}


//afficher le modal de confirmation
const proceedToAssignAdminRole = (id: number) => {
  selectedElement.value = id;

  showAssignAdminModal.value = !showAssignAdminModal.value
}

//aficher le modal pour suppression

const proceedToRemoveAdminRole = (id: number) => {
  selectedElement.value = id;

  showRemoveAdminModal.value = !showRemoveAdminModal.value
}

onMounted(() => {
  getAllUsers();
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  return users.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(users.value.length / pageSize));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <section>
    <div>
      <div v-if="isLoading" class="loader"></div>
      <div v-else class="container mt-5">
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
          <tbody v-for="user in paginatedUsers" :key="user.id">
            <tr>
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span v-for="role in user.roles" :key="role.id">{{ role.name }}</span>
              </td>
              <td>
                <button type="button" class="btn btn-info btn-sm" 
                :disabled="user.roles.some((role :any) => role.name === 'admin')"
                
                @click="proceedToAssignAdminRole(user.id)">
                  Nommer admin
                </button>
                <button type="button" class="btn btn-danger btn-sm ms-2" 
                :disabled="!user.roles.some((role: any) => role.name === 'admin')"
                
                @click="proceedToRemoveAdminRole(user.id)">
                  Retirer le rôle
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage">&#8592;</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">&#8594;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal confirmation pour nommer admin -->
    <div v-if="showAssignAdminModal && selectedElement" class="modal fade show" style="display: block;" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="btn-close" @click="closeModalAssignRole()"></button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir donner le rôle d'admin à cet utilisateur ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalAssignRole()">Non</button>
            <button type="button" class="btn btn-primary ms-2" @click="assignAdminRole()">Oui</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal confirmation pour retirer le rôle d'administrateur -->
    <div v-if="showRemoveAdminModal && selectedElement" class="modal fade show" style="display: block;" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="btn-close" @click="closeModalRemoveRole()"></button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir retirer le rôle d'administrateur ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalRemoveRole()">Annuler</button>
            <button type="button" class="btn btn-danger ms-2" @click="removeRole(selectedElement)">Oui</button>
          </div>
        </div>
      </div>
    </div>

</section>
</template>

<style scoped></style>
