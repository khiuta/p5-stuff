#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct{
  int* data;
  size_t size; // allocated slots
  size_t capacity; // total capacity
} IntSet;

IntSet* createEmptySet(){
  IntSet* set = (IntSet *)malloc(sizeof(IntSet));
  set->data = NULL;
  set->size = 0;
  set->capacity = 0;

  return set;
}

IntSet* createSet(int* elements, int count){
  IntSet* set = (IntSet *)malloc(sizeof(IntSet));
  set->data = (int *)malloc(count * sizeof(int));
  set->size = count;
  set->capacity = count;

  if(set == NULL){
    printf("Memory allocation failed!\n");
    return NULL;
  }

  for(int i = 0; i < count; i++){
    set->data[i] = elements[i];
  }

  return set;
}

IntSet* copySet(IntSet* set){
  IntSet* new_set = (IntSet *)malloc(sizeof(IntSet));
  new_set->data = set->data;
  new_set->size = set->size;
  new_set->capacity = set->capacity;

  return new_set;
}

void showSet(IntSet* set, char* name){
  printf("\n%s: ", name);
  for(int i = 0; i < set->size; i++){
    if(i != set->size - 1) printf("%i, ", set->data[i]);
    else printf("%i", set->data[i]);
  }
}

IntSet* setDiff(IntSet* set_a, IntSet* set_b){
  // uses the size of the biggest set
  size_t tmp_size = set_a->capacity;
  if(set_b->capacity > set_a->capacity) tmp_size = set_b->capacity;

  IntSet* diff_set = (IntSet *)malloc(sizeof(IntSet));
  diff_set->data = (int *)malloc(tmp_size * sizeof(int));
  diff_set->capacity = tmp_size;

  int diff_set_index = 0;
  for(int i = 0; i < tmp_size; i++){
    int j = 0;
    int found_match = 0;
    while(set_b->data[j]){
      if(set_a->data[i] == set_b->data[j]) found_match = 1;
      j++;
    }
    if(found_match == 0){
      diff_set->data[diff_set_index] = set_a->data[i];
      diff_set_index++;
      diff_set->size++;
    }
  }

  if(diff_set->size < tmp_size){
    // remove unused slots, if any
    int* tmp = (int *)realloc(diff_set->data, diff_set->size * sizeof(int));

    if(tmp == NULL){
      printf("Memory reallocation failed!\n");
      free(diff_set);
      return NULL;
    }

    diff_set->data = tmp;
  }

  return diff_set;
}

IntSet* setIntersection(IntSet* set_a, IntSet* set_b){
  // uses the size of the biggest set
  size_t tmp_size = set_a->capacity;
  if(set_b->capacity > set_a->capacity) tmp_size = set_b->capacity;

  IntSet* inter_set = (IntSet *)malloc(sizeof(IntSet));
  inter_set->data = (int *)malloc(tmp_size * sizeof(int));
  inter_set->capacity = tmp_size;

  int inter_set_index = 0;
  for(int i = 0; i < tmp_size; i++){
    int j = 0;
    int found_match = 0;
    while(set_b->data[j]){
      if(set_a->data[i] == set_b->data[j]) found_match = 1;
      j++;
    }
    if(found_match == 1){
      inter_set->data[inter_set_index] = set_a->data[i];
      inter_set_index++;
      inter_set->size++;
    }
  }

  if(inter_set->size < tmp_size){
    // remove unused slots, if any
    int* tmp = (int *)realloc(inter_set->data, inter_set->size * sizeof(int));

    if(tmp == NULL){
      printf("Memory reallocation failed!\n");
      free(inter_set);
      return NULL;
    }

    inter_set->data = tmp;
  }

  return inter_set;
}

IntSet* unionSet(IntSet* set_a, IntSet* set_b){
  size_t union_size = set_a->size + set_b->size;

  IntSet* union_set = (IntSet *)malloc(sizeof(IntSet));
  union_set->data = (int *)malloc(union_size * sizeof(int));
  union_set->size = union_size;
  union_set->capacity = union_size;

  for(int i = 0; i < set_a->size; i++){
    union_set->data[i] = set_a->data[i];
  }
  for(int j = 0; j < set_b->size; j++){
    union_set->data[j + set_a->size] = set_b->data[j];
  }

  return union_set;
}

int belongsToSet(IntSet* set, int element){
  int found = 0;
  for(int i = 0; i < set->size; i++){
    if(set->data[i] == element) found = 1;
  }

  return found;
}

int isProperSubset(IntSet* set, IntSet* subset){
  // if they are the same size, the subset can't be proper
  if(set->size == subset->size) return 0;

  // finds a match for each element
  int found_each = 0;
  for(int i = 0; i < subset->size; i++){
    for(int j = 0; j < set->size; j++){
      if(subset->data[i] == set->data[j]) found_each++;
    }
  }

  // if every item from the subset found a match, then every item incremented the value
  if(found_each == subset->size) return 1;
  else return 0;
}

IntSet** allProperSubsets(IntSet* set){
  // 2^n - 1 since its just proper subsets
  int n_of_subsets = powf(2.0f, (float)set->size-1);
  IntSet** proper_subsets = malloc(n_of_subsets * sizeof(IntSet*));

  
}

int main() {
    int els[] = {1, 2, 3};
    int els2[] = {1, 4, 5};
    int els3[] = {1, 3};
    IntSet* set = createSet(els, 3);
    IntSet* set2 = createSet(els2, 3);
    IntSet* set3 = createSet(els3, 2);
    IntSet* diff = setDiff(set, set2);
    IntSet* inter = setIntersection(set, set2);
    IntSet* union_set = unionSet(set, set2);

    showSet(set, "A");
    showSet(set2, "B");
    showSet(diff, "A - B");
    showSet(inter, "A inter B");
    showSet(union_set, "A U B");
    printf("\nBelongs to set: %i", belongsToSet(set, 2));
    printf("\nIs proper subset: %i", isProperSubset(set, set3));
    printf("\nIs proper subset: %i", isProperSubset(set, set));


    // 5. Free the allocated memory
    // free(arr);
    // arr = NULL; // Good practice to prevent dangling pointers

    return 0;
}