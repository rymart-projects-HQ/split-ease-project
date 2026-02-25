import { $fetch } from "ofetch";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type GroupMember = {
  userId: string;
  userName: string;
  userEmail: string;
  joinedAt: string;
};

export type Group = {
  id: string;
  name: string;
  description: string | null;
  createdById: string;
  members: GroupMember[];
  createdAt: string;
  updatedAt: string;
};

export type NewGroup = {
  name: string;
  description?: string;
  memberEmails?: string[];
};

export const useGroupsStore = defineStore("groups", () => {
  // State
  const groups = ref<Group[]>([]);
  const currentGroup = ref<Group | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const groupCount = computed(() => groups.value.length);

  const groupById = computed(() => {
    return (id: string) => groups.value.find(g => g.id === id);
  });

  const userGroups = computed(() => {
    return (userId: string) => groups.value.filter(g =>
      g.createdById === userId || g.members.some(m => m.userId === userId),
    );
  });

  // Actions
  async function fetchGroups() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch("/api/groups");
      groups.value = data as Group[];
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function fetchGroup(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${id}`);
      currentGroup.value = data as Group;
      return currentGroup.value;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function createGroup(group: NewGroup) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch("/api/groups", {
        method: "POST",
        body: group,
      });

      const newGroup = data as Group;
      groups.value.push(newGroup);
      return newGroup;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function updateGroup(id: string, updates: Partial<NewGroup>) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${id}`, {
        method: "PATCH",
        body: updates,
      });

      const updated = data as Group;
      const index = groups.value.findIndex(g => g.id === id);
      if (index !== -1) {
        groups.value[index] = updated;
      }
      if (currentGroup.value?.id === id) {
        currentGroup.value = updated;
      }
      return updated;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function deleteGroup(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`/api/groups/${id}`, {
        method: "DELETE",
      });

      groups.value = groups.value.filter(g => g.id !== id);
      if (currentGroup.value?.id === id) {
        currentGroup.value = null;
      }
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function addMember(groupId: string, userEmail: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${groupId}/members`, {
        method: "POST",
        body: { userEmail },
      });

      const updated = data as Group;
      const index = groups.value.findIndex(g => g.id === groupId);
      if (index !== -1) {
        groups.value[index] = updated;
      }
      if (currentGroup.value?.id === groupId) {
        currentGroup.value = updated;
      }
      return updated;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function removeMember(groupId: string, userId: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${groupId}/members/${userId}`, {
        method: "DELETE",
      });

      const updated = data as Group;
      const index = groups.value.findIndex(g => g.id === groupId);
      if (index !== -1) {
        groups.value[index] = updated;
      }
      if (currentGroup.value?.id === groupId) {
        currentGroup.value = updated;
      }
      return updated;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  function clearGroups() {
    groups.value = [];
    currentGroup.value = null;
  }

  function clearError() {
    error.value = null;
  }

  return {
    // State
    groups: readonly(groups),
    currentGroup: readonly(currentGroup),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    groupCount,
    groupById,
    userGroups,

    // Actions
    fetchGroups,
    fetchGroup,
    createGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    clearGroups,
    clearError,
  };
});
