import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,

});
const makeToast = (type, message) => {
    Toast.fire({
        icon: type,
        title: message,
    });
};
export default makeToast;
