document.addEventListener("DOMContentLoaded", function () {
	var courseId;
	var deleteForm = document.forms["delete-course-form"];
	restoreForm = document.forms["restore-course-form"];
	var btnDeleteCourse = document.getElementById("btn-delete-course");
	var restoreBtn = $(".btn-restore");
	$("#delete-course-modal").on("show.bs.modal", function (event) {
		var button = $(event.relatedTarget);
		courseId = button.data("id");
	});
	btnDeleteCourse.onclick = function () {
		deleteForm.action = "/courses/" + courseId + "/force?_method=DELETE";
		deleteForm.submit();
	};
	restoreBtn.click(function (e) {
		e.preventDefault();
		var courseId = $(this).data("id");
		restoreForm.action = "/courses/" + courseId + "/restore?_method=PATCH";
		restoreForm.submit();
	});
});
