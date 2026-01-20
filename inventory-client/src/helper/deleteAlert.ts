 

import Swal from 'sweetalert2';

// Type definition for delete functions
type DeleteFunction = (id: string) => Promise<any>;

interface DeleteAlertOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  entityName?: string;
}

/**
 * Reusable delete confirmation alert
 * @param id - The ID of the item to delete
 * @param deleteFunction - The API request function to call for deletion
 * @param options - Optional customization for the alert
 * @returns Promise<boolean> - Returns true if deleted, false if cancelled
 */
export async function DeleteAlert(
  id: string,
  deleteFunction: DeleteFunction,
  options: DeleteAlertOptions = {},
): Promise<boolean> {
  const {
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    confirmButtonText = 'Yes, delete it!',
    entityName = 'item',
  } = options;

  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
  });

  if (result.isConfirmed) {
    try {
      await deleteFunction(id);

      // Optional success message
      await Swal.fire({
        title: 'Deleted!',
        text: `Your ${entityName} has been deleted.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      // Optional error handling
      await Swal.fire({
        title: 'Error!',
        text: `Failed to delete ${entityName}. Please try again.`,
        icon: 'error',
      });

      return false;
    }
  }

  return false;
}