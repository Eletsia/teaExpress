import supabase from "../shared/supabase";

async function uploadFile(file) {
    const fileName = "public/" + file.name;
    const { data, error } = await supabase.storage
      .from("post_img")
      .upload(fileName, file);
  
    if (error) {
      alert("업로드 실패");
    } else {
      alert("업로드 성공");
      return await loadFile(fileName);
    }
  }
  
  async function loadFile(file_path) {
    const { data } = supabase.storage.from("post_img").getPublicUrl(file_path);
    console.log("loadFile: ", data);
    return data;
  }
  
  export { uploadFile, loadFile };