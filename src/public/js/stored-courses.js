document.addEventListener("DOMContentLoaded", function () {
	var courseId;
	var deleteForm = document.forms["delete-course-form"];
	var btnDeleteCourse = document.getElementById("btn-delete-course");
	var checkboxAll = $("#checkbox-all");
	var courseItemCheckbox = $('input[name="courseIds[]"]');
	var checkAllSubmitBtn = $(".check-all-submit-btn");
	// var containerForm = document.forms["container-form"];
	var containerForm = $('form[name="container-form"]');
	$("#delete-course-modal").on("show.bs.modal", function (event) {
		var button = $(event.relatedTarget);
		courseId = button.data("id");
	});
	btnDeleteCourse.onclick = function () {
		deleteForm.action = "/courses/" + courseId + "?_method=DELETE";
		deleteForm.submit();
	};

	checkboxAll.change(function () {
		var isCheckedAll = $(this).prop("checked");
		courseItemCheckbox.prop("checked", isCheckedAll);
		renderCheckAllSubmitBtn();
	});

	courseItemCheckbox.change(function () {
		var isCheckedAll =
			courseItemCheckbox.length ===
			$('input[name="courseIds[]"]:checked').length;
		checkboxAll.prop("checked", isCheckedAll);
		renderCheckAllSubmitBtn();
	});

	function renderCheckAllSubmitBtn() {
		var checkedCount = $('input[name="courseIds[]"]:checked').length;
		if (checkedCount > 0) {
			checkAllSubmitBtn.attr("disabled", false);
		} else {
			checkAllSubmitBtn.attr("disabled", true);
		}
	}
});
