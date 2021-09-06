import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});
const makeToast = (type, message) => {
    Toast.fire({
        icon: type,
        text: message,
    });
};
export default makeToast;
