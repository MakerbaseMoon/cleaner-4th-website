import os, json, gzip

def main():
    files = open_asset_manifest()
    files = gzip_files(files)
    files = files + open_public_files()

    print("files:")
    for file in files:
        print(file)

    c_code1 = generate_c_code(files)
    c_code2 = files_to_c(files)

    # Concatenate the two code strings
    c_code = "#include <Arduino.h>\n\n" + c_code1 + c_code2

    # Write the code to website.h
    with open("website.h", "w") as f:
        f.write(c_code)

def open_asset_manifest():
    # open the file and read its contents
    with open('build/asset-manifest.json') as f:
        data = json.load(f)
    
    files = [ 
        { 'filename': 'index.html', 'filepath': 'build' + data['files']['index.html'] },
        { 'filename': 'main.js',    'filepath': 'build' + data['files']['main.js']    },
        { 'filename': 'main.css',   'filepath': 'build' + data['files']['main.css']   }
    ]

    # print("[open_asset_manifest]files:", files)
    return files

def open_public_files():
    files = os.listdir('build/')

    # specify the files to remove
    remove_files = ['asset-manifest.json', 'index.html', 'static', 'index.html.gz']

    # use a list comprehension to filter out the unwanted files
    files = [file for file in files if file not in remove_files]

    # create a list of dictionaries with filename and full filepath for each file
    file_data = [{'filename': file, 'filepath': f'build/{file}'} for file in files]

    # print("[open_public_files]file_data:", file_data)
    return file_data

def gzip_files(files):
    for file in files:
        filename = file['filepath']

        with open(filename, 'rb') as f_in:
            with gzip.open(f'{filename}.gz', 'wb') as f_out:
                f_out.writelines(f_in)
        file['filepath_gz'] = f'{filename}.gz'

    return files

def file_to_binary(filename):
    with open(filename, 'rb') as f:
        binary_data = f.read()
    return binary_data


def files_to_c(files):
    c_code = ''

    for file in files:
        if "filepath_gz" in file:
            filename = file['filepath_gz']
        else:
            filename = file['filepath']
        # Open the file and read its contents as binary data
        with open(filename, 'rb') as f:
            file_data = f.read()

        # Generate a C-compatible array name by replacing '.' with '_'
        array_name = f"{file['filename']}".replace('.', '_')

        # Generate the C code
        c_code += f"#define {array_name}_len {len(file_data)}\n\n"
        c_code += f"const uint8_t {array_name}[] PROGMEM = {{"
        for i, byte in enumerate(file_data):
            if i % 10 == 0:
                c_code += "\n    "
            c_code += f"0x{byte:02X}, "
        c_code = c_code[:-2] + "\n};\n\n"
    
    return c_code

def generate_c_code(file_list):
    c_code = "#define WEBSITE \\\n"
    for f in file_list:
        filepath = f['filepath'][6:] if f['filepath'].startswith('build/') else f['filepath']  # remove "build" from path if it exists
        if filepath == 'index.html':
            filepath = ""
        c_code += f'server.on("/{filepath}", HTTP_GET, [] (AsyncWebServerRequest *request) {{ \\\n'
        if "filepath_gz" in f:
            c_code += f'    AsyncWebServerResponse *response = request->beginResponse_P(200, "{get_mime_type(f["filename"])}", {get_variable_name(f["filename"])}, {get_variable_name(f["filename"])}_len); \\\n'
            c_code += f'    response->addHeader("Content-Encoding", "gzip"); \\\n'
        else:
            c_code += f'    AsyncWebServerResponse *response = request->beginResponse_P(200, "{get_mime_type(f["filename"])}", {get_variable_name(f["filename"])}, {get_variable_name(f["filename"])}_len); \\\n'
        c_code += f'    request->send(response);\\\n}}); \\\n\\\n'

    c_code += '\n'

    return c_code

def get_variable_name(filename):
    return filename.replace(".", "_")

def get_mime_type(filename):
    if filename.endswith(".html"):
        return "text/html"
    elif filename.endswith(".js"):
        return "text/javascript"
    elif filename.endswith(".css"):
        return "text/css"
    elif filename.endswith(".png"):
        return "image/png"
    elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
        return "image/jpeg"
    elif filename.endswith(".ico"):
        return "image/x-icon"
    else:
        return "application/octet-stream"
    
if __name__ == "__main__":
    main()